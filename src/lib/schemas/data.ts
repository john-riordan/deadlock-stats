import * as v from 'valibot';

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
