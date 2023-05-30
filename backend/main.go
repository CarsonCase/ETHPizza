package main

import (
	// "github.com/ethereum/go-ethereum/accounts/abi"
	"context"
	"log"
	"os"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Toppings struct {
	Bacon       bool `json:"bacon"`
	Pineapple   bool `json:"pineapple"`
	Olives      bool `json:"olivescript"`
	BellPeppers bool `json:"bellPeppers"`
	Peperoni    bool `json:"peperoni"`
	Sausage     bool `json:"sausage"`
	ExtraCheese bool `json:"extraCheese"`
}

type Crust struct {
	Italian    bool `json:"italian"`
	Classic    bool `json:"classic"`
	GlutenFree bool `json:"glutenFree"`
	Drink      bool `json:"drink"`
}

type Custom struct {
	Toppings Toppings `json:"topings"`
	Crust    int      `json:"crust"`
	Size     int      `json:"size,string"`
}

type MenuItem struct {
	ID       int     `json:"id"`
	Type     int     `json:"type"`
	Title    string  `json:"title"`
	Price    float64 `json:"price"`
	ImageURL string  `json:"imageUrl"`
	Custom   Custom  `json:"custom"`
}

type OrderPricing struct {
	PriceUSD float64 `json:"priceUSD"`
	PriceETH string  `json:"priceETH"`
}

type Order struct {
	ID          string       `json:"id"`
	MenuItems   []MenuItem   `json:"menuItems"`
	PriceData   OrderPricing `json: "priceData"`
	OrderStatus int          `json:"orderStatus"`
	Maker       string       `json:"maker"`
}

type ContractABI struct {
	ABI     string `json:abi""`
	Address string `json:"address"`
}

// func handleEvent(eventData common.Hex){
// 	address := common.HexToAddress(eventData)
// 	fmt.Prinln(address)
// }

func listenEvent(orderCollection *mongo.Collection) {
	client, err := ethclient.Dial(os.Getenv("API_STRING"))
	if err != nil {
		log.Fatal(err)
	}

	contractAddress := common.HexToAddress(os.Getenv("CONTRACT_ADDRESS"))
	query := ethereum.FilterQuery{
		Addresses: []common.Address{contractAddress},
		Topics:    [][]common.Hash{{common.HexToHash("0x7c6a000d6581009ece38db2bf0a802db87c25d55bdf668f06a962b9c71884773")}},
	}

	logs := make(chan types.Log)
	sub, err := client.SubscribeFilterLogs(context.Background(), query, logs)
	if err != nil {
		log.Fatal(err)
	}

	for {
		select {
		case err := <-sub.Err():
			log.Fatal(err)
		case vLog := <-logs:
			address := (common.HexToAddress(vLog.Topics[1].Hex()))
			filter := bson.M{"id": address.Hex()}
			update := bson.M{"$set": bson.M{"orderStatus": 2}}
			result, err := orderCollection.UpdateOne(context.Background(), filter, update)
			if err != nil {
				log.Fatal(err)
			}
			log.Printf("Updated %v order(s)", result.ModifiedCount)
		}
	}

}

func main() {
	err := godotenv.Load()

	if err != nil {
		panic("Error loading .env file")
	}

	r := gin.Default()

	// Add CORS middleware
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
	config.AllowHeaders = []string{"Origin", "Content-Type"}
	r.Use(cors.New(config))

	uri := os.Getenv("MONGO_STRING")

	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		panic(err)
	}

	menuCollection := client.Database("data").Collection("menuItems")
	orderCollection := client.Database("data").Collection("orders")

	go listenEvent(orderCollection)

	r.GET("/menuItems", func(c *gin.Context) {
		var menuItems []MenuItem
		cursor, err := menuCollection.Find(context.Background(), bson.M{})

		if err != nil {
			c.AbortWithError(500, err)
			return
		}
		defer cursor.Close(context.Background())
		for cursor.Next(context.Background()) {
			var menuItem MenuItem
			if err := cursor.Decode(&menuItem); err != nil {
				c.AbortWithError(500, err)
				return
			}
			menuItems = append(menuItems, menuItem)
		}
		if err := cursor.Err(); err != nil {
			c.AbortWithError(500, err)
			return
		}
		c.JSON(200, menuItems)
	})

	r.GET("/orders", func(c *gin.Context) {
		var orders []Order
		cursor, err := orderCollection.Find(context.Background(), bson.M{})

		if err != nil {
			c.AbortWithError(500, err)
			return
		}
		defer cursor.Close(context.Background())
		for cursor.Next(context.Background()) {
			var order Order
			if err := cursor.Decode(&order); err != nil {
				c.AbortWithError(500, err)
				return
			}
			orders = append(orders, order)
		}
		if err := cursor.Err(); err != nil {
			c.AbortWithError(500, err)
			return
		}
		c.JSON(200, orders)

	})

	r.POST("/orders", func(c *gin.Context) {

		var order Order
		if err := c.BindJSON(&order); err != nil {
			c.AbortWithError(400, err)
			return
		}
		insertResult, err := orderCollection.InsertOne(context.Background(), order)
		if err != nil {
			c.AbortWithError(500, err)
			return
		}
		log.Printf("Inserted order with ID %v", insertResult.InsertedID)
		c.Status(201)
	})

	r.POST("/updateOrder", func(c *gin.Context) {
		var order Order
		if err := c.BindJSON(&order); err != nil {
			c.AbortWithError(400, err)
			return
		}

		filter := bson.M{"id": order.ID}
		update := bson.M{"$set": bson.M{"orderStatus": order.OrderStatus}}
		result, err := orderCollection.UpdateOne(context.Background(), filter, update)
		if err != nil {
			c.AbortWithError(500, err)
			return
		}
		log.Printf("Inserted order with ID %v", result.UpsertedID)
		c.Status(201)
	})

	r.Run(":8080")
}
