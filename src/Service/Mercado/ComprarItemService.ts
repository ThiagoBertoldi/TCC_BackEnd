import { ObjectId } from "mongodb";
import { client } from "../../database/client";

interface CompraItemInterface {
   idMateria: string,
   descricaoItem: string,
   moedasItem: number,
   idAluno: string
}

class CompraItemService {
   async execute({ idMateria, descricaoItem, moedasItem, idAluno }: CompraItemInterface) {
      if (!idMateria || !descricaoItem || !moedasItem || !idAluno)
         throw new Error('Não foi possível comprar esse item')

      let horaCompra = new Date()

      const saldoCarteira = await client.collection('CarteiraAluno').findOne({ idAluno: new ObjectId(idAluno), idMateria: new ObjectId(idMateria) })
      if(!saldoCarteira?._id || saldoCarteira?.moedas < moedasItem)
         throw new Error('Você não tem moedas suficientes para comprar esse item')

      const aluno = await client.collection('User').findOne({ _id: new ObjectId(idAluno), type: 2 })
      if(!aluno?._id)
         throw new Error('Erro ao processar a compra, usuário não encontrado')

      const materia = await client.collection('Materia').findOne({ _id: new ObjectId(idMateria) })
      if(!materia?._id)
         throw new Error('Erro ao processar a compra, matéria não encontrada')

      const professor = await client.collection('User').findOne({ _id: new ObjectId(materia.idProfessor), type: 1 })
      if(!professor?._id)   
         throw new Error('Erro ao processar a compra, professor da matéria não foi encontrado')

      let notificacaoProfessor = {
         nomeAluno: aluno.username,
         itemComprado: descricaoItem,
         preco: moedasItem,
         materia: materia.nomeMateria,
         turma: materia.turma,
         idProfessorResponsavel: new ObjectId(professor._id),
         created_at: horaCompra
      }

      const avisaProfessor = await client.collection('NotificaProfessor').insertOne(notificacaoProfessor)
      if(!avisaProfessor?.insertedId)
         throw new Error('Não foi possível notificar o professor, compra cancelada')
      else {
         let saldoRestante = saldoCarteira.moedas - moedasItem

         let attCarteira = { $set: { moedas: saldoRestante } }
         await client.collection('CarteiraAluno').updateOne({ idAluno: new ObjectId(idAluno), idMateria: new ObjectId(idMateria) }, attCarteira)

         let extratoAluno = {
            itemComprado: descricaoItem,
            moedas: moedasItem,
            saldoAnterior: saldoCarteira.moedas,
            novoSaldo: saldoRestante,
            idMateria: new ObjectId(idMateria),
            idAluno: new ObjectId(idAluno),
            idProfessor: new ObjectId(professor._id),
            created_at: horaCompra
         }

         await client.collection('ExtratoAluno').insertOne(extratoAluno)
      }
         
      return { descricaoItem, moedasItem, compraRealizada: true };
   }
}

export { CompraItemService }