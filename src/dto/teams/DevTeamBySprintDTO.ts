import { DeveloperBySprintDTO } from "./DeveloperBySprintDTO"

export interface DevTeamBySprintDTO {
    id: number
    name: string
    developers: DeveloperBySprintDTO[]
    team_load: number
    fto_overall: number
    fto_assigned: number
}