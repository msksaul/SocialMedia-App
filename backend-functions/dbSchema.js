let db = {
  users: [
    {
      userId: 'asdf2454567ertsdh456ryt',
      email: 'user@email.com',
      handle: 'user',
      createdAt: '2020-10-15T10:59:52.798Z',
      imageUrl: 'image/asdasdfasdf/asdasdfasdf',
      bio: 'Hello my name is user, nice to meet you',
      website: 'https:user.com',
      location: 'London, UK'
    }
  ],
  screams: [
    {
      userHandler: 'user',
      body: 'this is the scream body',
      createdAt: '2020-10-06T01:13:37.022Z',
      likeCount: 5,
      commentCount: 2
    }
  ],
  comments: [
    {
      userHandle: 'user',
      screamId: 'asdf2354ertwtr',
      body: 'nice on mate',
      createdAt: '2020-10-06T01:13:37.022Z'
    }
  ]
}

const userDetails = {
  credentials: {
    userId: 'asdfqwer235wert456wert',
    email: 'user@email.com',
    handle: 'user',
    createdAt: '2020-10-15T10:59:52.798Z',
    imageUrl: 'image/asdasdfasdf/asdasdfasdf',
    bio: 'Hello my name is user, nice to meet you',
    website: 'https:user.com',
    location: 'London, UK'
  },
  likes : [
    {
      userHandle: 'user',
      screamId: 'asdfqwer2345ewr'
    },
    {
      userHandle: 'user1',
      screamId: 'asdf1234rtasf'
    }
  ]
}