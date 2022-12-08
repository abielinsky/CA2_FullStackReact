const router = require(`express`).Router();

const AttractionsModel = require(`../models/Attractions`);

// read all records
router.get(`/Attractions`, (req, res) => {
  //user does not have to be logged in to see car details
  AttractionsModel.find((error, data) => {
    res.json(data);
  });
});

// Read one record
router.get(`/Attractions/:id`, (req, res) => {
  AttractionsModel.findById(req.params.id, (error, data) => {
    res.json(data);
  });
});

router.post(`/Attractions`, (req, res) => {
  AttractionsModel.create(req.body, (error, data) => {
    res.json(data);
  });
});

router.put(`/Attractions/:id`, (req, res) => {
  AttractionsModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, data) => {
      res.json(data);
    }
  );
});

router.delete(`/Attractions/:id`, (req, res) => {
  AttractionsModel.findByIdAndDelete(req.params.id, (error, data) => {
    res.json(data);
  });
});

router.delete(`/ResetAttractions`, (req, res) => {
  AttractionsModel.deleteMany((error, data) => {
    res.json(data);
  });
});

router.get("/tags", (req, res) => {
  AttractionsModel.find((error, data) => {
    let tags = [];
    data.map((attraction) => tags.push.apply(tags, attraction.tags));
    var uniqueTags = [...new Set(tags)].sort();
    if (uniqueTags.length > 0) {
      res.json(uniqueTags);
      return;
    }
    res.json([
      "Activity",
      "Walking",
      "Gardens",
      "Attraction",
      "Cafe",
      "Food _and_Drink",
      "Historic_Houses_and_Castle",
      "Tour",
      "Museums_and_Attraction",
      "Food_and_Drink",
      "Nature and Wildlife",
      "Learning",
      "Abbeys and Monastery",
      "Gallery",
    ]);
  });
});

router.get("/types", (req, res) => {
  AttractionsModel.find((error, data) => {
    let types = [];
    data.map((attraction) => types.push.apply(types, attraction["@types"]));
    var uniqueTypes = [...new Set(types)].sort();
    if (uniqueTypes.length > 0) {
      res.json(uniqueTypes);
      return;
    }
    res.json([
      "LocalBusiness",
      "SportsActivityLocation",
      "TouristAttraction",
      "CafeOrCoffeeShop",
      "LandmarksOrHistoricalBuildings",
      "FoodEstablishment",
      "TravelAgency",
      "Landform",
      "Restaurant",
    ]);
  });
});

router.get("/localities", (req, res) => {
    AttractionsModel.find((error, data) => {
        let localities = data.map(attraction => attraction.address.addressLocality);        
        let uniqueLocalities = [...new Set(localities)].sort();

      if (uniqueLocalities.length > 0) {
        res.json(uniqueLocalities);
        return;
      }
      res.json(
        ["Adare","Ahakista","Ahenny","Arklow","Bagenalstown","Ballina","Ballinskelligs","Ballycumber","Ballyjamesduff","Ballyshannon","Baltimore","Bantry","Cahore","Cashel","Cashel Bay","Churchill","Clonmore","Conna","Cork City","Cross","Curracloe","Derrymore","Drimoleague","Drogheda","Dunquin","Fanore","Galway City","Glencolmcille","Gowran","Kells -Kerry","Kilcock","Kilgarvan","Laytown","Letterkenny","Lismore","Milltown","Oldbridge","Passage West","Saint Mullins","Schull","Sligo Town","Spanish Point","Thomastown","Thurles","Waterford City"]
      );
    });
  });

  router.get("/regions", (req, res) => {
    AttractionsModel.find((error, data) => {
        let regions = data.map(attraction => attraction.address.addressRegion);
        let uniqueRegions = [...new Set(regions)].sort();
      if (uniqueRegions.length > 0) {
        res.json(uniqueRegions);
        return;
      }
      res.json(["Carlow","Cavan","Clare","Cork","Donegal","Galway","Kerry","Kildare","Kilkenny","Limerick","Louth","Mayo","Meath","Offaly","Sligo","Tipperary","Waterford","Wexford","Wicklow"]);
    });
  });

module.exports = router;
