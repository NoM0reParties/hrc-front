import { DeveloperBySprintDTO } from "./DeveloperBySprintDTO"
import { DeveloperDTO } from "../admin/developer"

export interface DevTeamBySprintDTO {
    id: number
    name: string
    developers: DeveloperBySprintDTO[]
    team_load: number
    team_load_overall: number
    fto_overall: number
    fto_assigned: number
}


export interface DeveloperTeamDTO {
    id: number
    name: string
    developers: DeveloperDTO[]
}