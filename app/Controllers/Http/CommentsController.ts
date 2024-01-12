import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Comment from "App/Models/Comment"
import Moment from 'App/Models/Moment'

export default class CommentsController {

  public async store({params, request, response}: HttpContextContract) {

    const body = request.body()
    const momentId = params.momentId

    await Moment.findOrFail(momentId)

    body.momentId = momentId

    const comment = await Comment.create(body)
    response.status(201)

    return {
      msg: 'Comentário adicionado',
      data: comment,
    }

  }

  public async index({params}: HttpContextContract) {
    const momentId = params.momentId
    const comments = await Comment.query().where('moment_id', momentId)

    return {
      msg: `Todos os comentários do momento de id ${momentId}`,
      data: comments,
    }
  }

  public async show({params}: HttpContextContract) {
    const comment = await Comment.findOrFail(params.id)

    return {
      data: comment,
    }
  }

  public async destroy({params}: HttpContextContract) {
    const comment = await Comment.findOrFail(params.id)
    await comment.delete()

    const momentId = params.momentId
    const comments = await Comment.query().where('moment_id', momentId)

    return {
      msg: 'Comentário deletado',
      data: comments,
    }

  }

  public async update({params, request}: HttpContextContract) {
    const body = request.body()

    const comment = await Comment.findOrFail(params.id)

    if(comment) {
      comment.username = body.username
      comment.text = body.text
    }

    await comment.save()

    return {
      msg: "Comentário editado com sucesso",
      data: comment
    }
  }

}
