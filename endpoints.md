# User
## Signup
* Path: /api/user/signin
* Body: 
```json
{
    "id": //will be null,
    "email": "Jakob@mail.ngl",
    "usesrname": "jakobBreh",
    "password": "ichhabeinmegastarkespasswortkannmannichthackenundwenneswerhacktdannhackichzurückinphp!!!!"
    "icon_url": //will be null
}
```
* Response: 
```json
{
    "status": 0 = existiert bereit, 1 = successful,
    "id": 101
}
oder UserObject und wenns nicht geht null
```
## Login
* Path: /api/user/login
* Body: 
```json
```


# Exhibition
## Latest Max. 5
* Path: /api/exhibtion/latest
* Response: 
```json
[
  {
    "id": 1,
    "thumbnail_url": "assets/image/placeholder-card.jpg",
    "title": "Van Gogh",
    "room_id": 1,
    "description": "lorem ipsum"
  },
  {
    "id": 2,
    "thumbnail_url": "https://images.utopia.de/wxNOGiicKnkNXMLIe3x6loKwrJ4zEPT-RAGE9ZxjTx0/rt:fill/w:1152/h:864/g:ce/plain/2020/02/affe-haustier-cc0-pixabay-schwoaze-200127.jpg",
    "title": "Monkeys",
    "room_id": 1,
    "description": "Ahhh"
  }, {...}, {...}, {...}
]
```

## Create Exhibition
### Tags
#### Get All Tags
* Path: /api/exhibtion/create/allTags
* Response:
```json
[
  {
    "id": 1,
    "title" : "Art",
    "color" : "32A396"
  },{
    "id": 2,
    "title" : "History",
    "color" : "E4CB84"
  },{
    "id": 3,
    "title" : "Netherlands",
    "color" : "59939E"
  },{
    "id": 4,
    "title" : "Post-Impressionist",
    "color" : "DAAD33"
  }
]
```

### Room
#### Get All Rooms
* Path: /api/exhibtion/create/allRooms
* Response: 
```json
[
  {
    "id" : 1,
    "name" : "First Test Room",
    "position_amount":  12,
    "room_img_url":  "https://www.smb.museum/uploads/tx_smb/news/news_67970/Neues-Museum_Raum-Prolog_Achim_Kleuker_xl.jpg",
    "room_url": "1.gltf"
  },
  {
    "id" : 2,
    "name" : "Second Test Room",
    "position_amount":  6,
    "room_img_url":  "https://cdn.getyourguide.com/img/tour/5dc3e1094ca28.jpeg/97.jpg",
    "room_url": "2.gltf"
  }
]
```