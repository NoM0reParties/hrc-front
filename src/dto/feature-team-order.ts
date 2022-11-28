import { DeveloperDTO } from "./developer"
import { DeveloperTeamDTO } from "./developer-team"

export interface FeatureTeamOrderDTO {
    id: number
    dev_team: DeveloperTeamDTO
    updated: Date
    assigned: boolean
    hours: number
    auto_assignment?: boolean
    assigned_developer?: DeveloperDTO
    gap: number
}