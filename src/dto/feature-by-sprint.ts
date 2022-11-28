import { FeatureTeamOrderDTO } from "./feature-team-order"

export interface FeatureBySprintDTO {
    id: number
    name: string
    dev_team_orders: FeatureTeamOrderDTO[]
}