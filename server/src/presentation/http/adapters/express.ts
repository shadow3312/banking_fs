import { IController, IHttpRequest } from "@/types/presentation/adapters";
import { Request, Response } from "express";

export default function makeCallback(controller: IController) {
  return (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      method: req.method,
      ip: req.ip,
      path: req.path,
      headers: {
        "Content-type": req.headers["content-type"],
        Referer: req.headers["referer"],
        "User-agent": req.headers["user-agent"],
      },
    };
    controller(httpRequest)
      .then((httpResponse) => {
        if (httpRequest.headers) {
          res.set(httpRequest.headers);
        }
        res.type("json");
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((e) => res.status(500).send({ error: `${e}` }));
  };
}
