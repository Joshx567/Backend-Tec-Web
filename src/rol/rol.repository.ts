import { EntityRepository, Repository } from "typeorm";
import { RolEntity } from "./entities/rol.entity";
import { create } from "domain";

@EntityRepository(RolEntity)
export class RolRepository extends Repository<RolEntity>{

}