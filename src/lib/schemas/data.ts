import * as v from 'valibot';

export const SteamProfileSchema = v.array(
	v.object({
		account_id: v.number(),
		avatar: v.string(),
		avatarfull: v.string(),
		avatarmedium: v.string(),
		personaname: v.string(),
		profileurl: v.string(),
		realname: v.nullish(v.string(), null),
		countrycode: v.string(),
		last_updated: v.number()
	})
);
export type SteamProfile = v.InferOutput<typeof SteamProfileSchema>;

export const SteamProfilesSearchSchema = v.array(SteamProfileSchema);
export type SteamProfilesSearch = v.InferOutput<typeof SteamProfilesSearchSchema>;

export const PlayerMatchHistorySchema = v.array(
	v.object({
		account_id: v.number(),
		match_id: v.number(),
		hero_id: v.number(),
		hero_level: v.number(),
		start_time: v.number(),
		game_mode: v.number(),
		match_mode: v.number(),
		player_team: v.number(),
		player_kills: v.number(),
		player_deaths: v.number(),
		player_assists: v.number(),
		denies: v.number(),
		net_worth: v.number(),
		last_hits: v.number(),
		team_abandoned: v.nullish(v.boolean(), false),
		abandoned_time_s: v.nullish(v.number(), null),
		match_duration_s: v.number(),
		match_result: v.number(),
		objectives_mask_team0: v.number(),
		objectives_mask_team1: v.number(),
		username: v.nullish(v.string(), '')
	})
);
export type PlayerMatchHistory = v.InferOutput<typeof PlayerMatchHistorySchema>;

export const BuildSchema = v.object({
	hero_build: v.object({
		hero_id: v.number(),
		hero_build_id: v.number(),
		author_account_id: v.number(),
		last_updated_timestamp: v.number(),
		publish_timestamp: v.nullish(v.number(), 0),
		name: v.string(),
		description: v.string(),
		language: v.number(),
		version: v.number(),
		origin_build_id: v.number(),
		tags: v.array(v.number()),
		development_build: v.nullish(v.boolean(), false),
		details: v.object({
			mod_categories: v.array(
				v.object({
					name: v.string(),
					// width: v.number(),
					// height: v.number(),
					description: v.nullish(v.string(), ''),
					mods: v.nullish(
						v.array(
							v.object({
								ability_id: v.number(),
								annotation: v.nullish(v.string(), ''),
								required_flex_slots: v.nullish(v.number(), 0),
								sell_priority: v.nullish(v.number(), 0),
								imbue_target_ability_id: v.nullish(v.number(), 0)
							})
						),
						[]
					),
					optional: v.nullish(v.boolean(), false)
				})
			),
			ability_order: v.nullish(
				v.object({
					currency_changes: v.array(
						v.object({
							ability_id: v.number(),
							currency_type: v.number(),
							delta: v.number(),
							annotation: v.nullish(v.string(), '')
						})
					)
				})
			)
		})
	}),
	num_favorites: v.nullish(v.number(), 0),
	num_ignores: v.nullish(v.number(), 0),
	num_reports: v.nullish(v.number(), 0),
	num_weekly_favorites: v.nullish(v.number(), 0),
	rollup_category: v.nullish(v.number(), 0)
});
export type Build = v.InferOutput<typeof BuildSchema>;

export const BuildsSchema = v.array(BuildSchema);
export type Builds = v.InferOutput<typeof BuildsSchema>;

export const HeroesStatsSchema = v.array(
	v.object({
		hero_id: v.number(),
		bucket: v.number(),
		wins: v.number(),
		losses: v.number(),
		matches: v.number(),
		matches_per_bucket: v.number(),
		players: v.number(),
		total_kills: v.number(),
		total_deaths: v.number(),
		total_assists: v.number(),
		total_net_worth: v.number(),
		total_last_hits: v.number(),
		total_denies: v.number(),
		total_player_damage: v.number(),
		total_player_damage_taken: v.number(),
		total_boss_damage: v.number(),
		total_creep_damage: v.number(),
		total_neutral_damage: v.number(),
		total_max_health: v.number(),
		total_shots_hit: v.number(),
		total_shots_missed: v.number()
	})
);
export type HeroesStats = v.InferOutput<typeof HeroesStatsSchema>;
