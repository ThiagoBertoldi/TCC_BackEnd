import { Request, Response } from "express";
import { GetInfosAmigoService } from "../../Service/User/GetPerfilAmigoService";

class GetInfosAmigoController {
  async handle(req: Request, res: Response) {
    const { idAmigo } = req.query

    const service = new GetInfosAmigoService();

    const infos = await service.execute({ idAmigo: idAmigo as string });

    return res.json(infos);
  }
}

export { GetInfosAmigoController }