export interface FeatureTeamOrderDTO {
    id: number
    updated: Date
    dev_team_id: number
    feature_id: number
    assigned: boolean
    hours: number
    auto_assignment?: boolean
    gap: number
}