import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world' }
  })

  Route.resource('/moments', 'MomentsController').apiOnly()

  Route.resource('/moments/:momentId/comments', "CommentsController")
}).prefix('/api')
