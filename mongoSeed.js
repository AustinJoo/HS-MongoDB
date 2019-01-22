const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017/helensMongoCarousel';
const client = new MongoClient(uri);
const connection = client.connect();
const faker = require('faker');

const sampleStaticData = ['http://www.manglamgroup.com/wp-content/uploads/2015/11/aangan-prime-Sample-Villa-12.jpg',
'http://kesieuthi.top/wp-content/uploads/2018/08/sample-interior-design-small-living-room-prepossessing-sample-living-room-color-schemes-home-interiors-catalog-2017.jpg',
'http://www.bostoncondoloft.com/87hnm_cdn/we/living-room-interior-design-for-a-small-house-home_modern-house-and-floor-plans.jpg',
'http://www.nativeasthma.org/ldk_cdn/li/living-rooms-designs-small-space-home-design-ideas-cool-interior_inspired-living-room.jpg',
'http://candiceloper.info/wp-content/uploads/2018/07/small-house-ideas-interior-interesting-inspiration-design-sample-medieval-designs-for-indian-homes.jpg',
'http://www.whitehouse51.com/pic/i1.wp.com/nikura.co/wp-content/uploads/2017/05/cool-design-sample-interior-for-small-house-philippines-3-awesome-living-room-ideas-houses.jpg?resize=800%2C553',
'http://www.effmu.com/2/2015/08/natural-elegant-design-of-the-living-room-tv-wall-design-that-has-wooden-floor-can-be-decor-with-white-sofas-that-can-add-the-beauty-inside-the-modern-living.jpg',
'http://4.bp.blogspot.com/-wmaR3zRS2qg/T8BC6VPAsrI/AAAAAAAAAb4/fSugQzBRlMg/s1600/HomeInteriorCatalog3.jpg',
'http://kesieuthi.top/wp-content/uploads/2018/08/sample-interior-design-small-living-room-large-size-of-living-room-stimulating-small-sample-and-kitchen-sample-home-interiors-candles-holders.jpg',
'http://www.croatianwine.org/vj7/re/custom-luxury-kitchen-designs-that-cost-more-than_kitchen-decoration.jpg',
'https://www.tfod.in/UserProfileImages/ArticleImage/9i25HXGwbc14ccbb_6.jpg',
'https://teaworthy.com/wp-content/uploads/2018/10/home-interior-design-samples-sample-bedroom-designs-elegant-interior-design-samples-beautiful-best-set.jpg',
'http://artsample.blogs.eprevue.net/wp-content/uploads/sites/71/2019/01/bedroom-set.jpg',
'http://www.dsdiscountfurniture.com/wp-content/uploads/2011/10/TH5300Linen.jpg',
'http://tambaoads.com/wp-content/uploads/2018/08/home-interior-design-samples-interior-design-sample-interior-design-samples-arvelodesigns-best-pictures.jpg',
'http://dearcyprus.com/wp-content/uploads/2018/09/Astounding-Sample-Bedroom-Designs-Fireplace-Ideas-New-in-Sample-Bedroom-Designs-Ideas.jpg',
'http://www.kdarchitects.in/images/tanishk2.JPG',
'http://www.bullmenrealty.com/news/wp-content/uploads/2017/05/12-1.jpg',
'http://kesieuthi.top/wp-content/uploads/2018/08/sample-interior-design-small-living-room-large-size-of-living-room-living-room-design-ideas-inspiration-home-furniture-simple-home-interiors-home-parties-catalog.jpg',
'http://annickgirardin.info/wp-content/uploads/2018/02/that-furniture-store-design-lab-living-room-furniture-furniture-stores-in-nj-route-46.jpg',
'http://atlantawoods.com/wp-content/uploads/2015/02/Barnwood_Kitchen_Island.jpg',
'https://losandes.club/wp-content/uploads/2018/11/home-interior-painting-ideas-combinations-house-paint-colours-pictures-colors-bedroom-sample-modern-design-i.jpg',
'https://triangleosaka.club/wp-content/uploads/2018/12/bedroom-decor-ideas-for-small-rooms-home-interior-design-photos-india-flawless-contemporary-designs-appealing-by.jpg',
'http://jotlive.co/wp-content/uploads/2018/08/home-interior-design-ideas-kitchen-elegant-teal-cabinets-inspirational-kitchens-sample-designs-india.jpg',
'http://www.odeliabydesign.com/assets/marvelous-modern-tv-furniture-designs-modern-living-room-tv-furniture-zab-living.jpg',
'http://www.ethnodoc.org/portrait/CitiLights-The-Helux.jpg']
let creationCounter = 0; 
let adderNum = 150000;
let max = 150000;
let db;
let listingsDB;

let imagesCreator = () => {
    let imagesArray = [];
    for(let i = 0; i < 1000; i++){
        let imgCount = Math.floor(Math.random() * 3.00) + 8;
        let imageSet = []
        for(let j = 0; j < imgCount; j++){
            let url = sampleStaticData[Math.floor(Math.random() * Math.floor(sampleStaticData.length))];
            let caption = faker.lorem.sentence();
            image = {
                image_url: url,
                image_caption: caption
            }
            imageSet.push(image)
        }
        imagesArray.push(imageSet);
    }
    return imagesArray;
}
let imagePool = imagesCreator();

const connect = connection;
connect.then(() => {
    let listingArray = [];
    let data;

    let adder = () => {
        listingArray = [];
        console.log('the counter and max are: ', creationCounter, max)
        for (var i = creationCounter; i < max; i++) {
            let randNum = Math.floor(Math.random() * 1000);
            data = {
                _id: i,
                images: imagePool[randNum]
            }
            listingArray.push(data);
            creationCounter++;
        }
        db = client.db('helensMongoCarousel');
        listingsDB = db.collection('listings');
        listingsDB.insertMany(listingArray, (err, data) => {
            if (err) {
                console.log('Could not save listing data', err);
            } else if(creationCounter < 10000000){
                max += adderNum;
                console.log('entered: ', creationCounter, ' data points so far!');
                adder();
            } else {
                console.timeEnd('timer');
                console.log('stopping');
            }
        })
    }
    console.time('timer');
    adder();
})
.then(() => {
    console.log('Here we go!')
    // console.log('Done. Added ', creationCounter, ' listings into the listings database & ', imageMax, ' images into the images database!')
})
