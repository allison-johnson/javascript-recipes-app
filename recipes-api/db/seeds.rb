Recipe.destroy_all
Recipe.reset_pk_sequence

Recipe.create(name: "Chicken Soup", 
                url: "https://thepioneerwoman.com/cooking/chunky-chicken-soup/", 
                img_url: "https://thepioneerwoman.com/wp-content/uploads/2011/12/chickensoup1.jpg?resize=630%2C420"
                )

Recipe.create(name: "Bakewell Tart",
                url: "https://www.christinascucina.com/mary-berrys-bakewell-tart-and-a-bbc-good-food-show-scotland-ticket-giveaway/",
                img_url: "https://d3eh3svpl1busq.cloudfront.net/AqOsDSWHlMyaklhBnvzkgRREKBfEHKZc/assets/static/source/rev-08e6e84/wp-content/uploads/2014/09/IMG_7526-809x1024.jpg"
                )

Recipe.create(name: "Buffalo Chicken Fingers",
                url: "https://sallysbakingaddiction.com/crispy-baked-buffalo-chicken-fingers/",
                img_url: "https://cdn.sallysbakingaddiction.com/wp-content/uploads/2016/04/buffalo-chicken-fingers-3.jpg"
                )

Recipe.create(name: "Lemon Turmeric Cake",
                url: "https://cooking.nytimes.com/recipes/1020637-lemony-turmeric-tea-cake",
                img_url: "https://static01.nyt.com/images/2019/11/26/dining/ar-lemony-turmeric-tea-cake/merlin_165035286_7fd1d30a-adce-4f81-b363-9066f36471fe-articleLarge.jpg"
                )
