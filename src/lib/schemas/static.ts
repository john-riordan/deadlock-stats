import * as v from 'valibot';

export const VersionsSchema = v.array(v.number());

export type Versions = v.InferOutput<typeof VersionsSchema>;

export const HeroSchema = v.object({
	id: v.number(),
	class_name: v.string(),
	name: v.string(),
	description: v.object({
		lore: v.string(),
		role: v.optional(v.string(), ''),
		playstyle: v.optional(v.string(), '')
	}),
	tags: v.array(v.string()),
	gun_tag: v.string(),
	hideout_rich_presence: v.optional(v.string(), ''),
	hero_type: v.string(),
	complexity: v.number(),
	images: v.object({
		icon_hero_card: v.string(),
		icon_hero_card_webp: v.string(),
		icon_image_small: v.string(),
		icon_image_small_webp: v.string(),
		minimap_image: v.string(),
		minimap_image_webp: v.string(),
		selection_image: v.optional(v.string(), ''),
		selection_image_webp: v.optional(v.string(), ''),
		top_bar_image: v.string(),
		top_bar_image_webp: v.string(),
		top_bar_vertical_image: v.string(),
		top_bar_vertical_image_webp: v.string(),
		background_image: v.string(),
		background_image_webp: v.string(),
		name_image: v.string()
	}),
	items: v.object({
		weapon_primary: v.string(),
		weapon_melee: v.string(),
		ability_mantle: v.string(),
		ability_jump: v.string(),
		ability_slide: v.string(),
		ability_zip_line: v.string(),
		ability_zip_line_boost: v.string(),
		ability_climb_rope: v.string(),
		ability_innate1: v.string(),
		ability_innate2: v.string(),
		ability_innate3: v.string(),
		eslot_cosmetic_1: v.string(),
		signature1: v.string(),
		signature2: v.string(),
		signature3: v.string(),
		signature4: v.string()
	}),
	cost_bonuses: v.object({
		weapon: v.array(
			v.object({
				gold_threshold: v.number(),
				bonus: v.number(),
				percent_on_graph: v.number()
			})
		),
		vitality: v.array(
			v.object({
				gold_threshold: v.number(),
				bonus: v.number(),
				percent_on_graph: v.number()
			})
		),
		spirit: v.array(
			v.object({
				gold_threshold: v.number(),
				bonus: v.number(),
				percent_on_graph: v.number()
			})
		)
	}),
	standard_level_up_upgrades: v.object({
		MODIFIER_VALUE_BASE_BULLET_DAMAGE_FROM_LEVEL: v.number(),
		MODIFIER_VALUE_BASE_BULLET_DAMAGE_FROM_LEVEL_ALT_FIRE: v.number(),
		MODIFIER_VALUE_BASE_HEALTH_FROM_LEVEL: v.number(),
		MODIFIER_VALUE_BASE_MELEE_DAMAGE_FROM_LEVEL: v.number(),
		MODIFIER_VALUE_BONUS_ATTACK_RANGE: v.number(),
		MODIFIER_VALUE_BOON_COUNT: v.number(),
		MODIFIER_VALUE_BULLET_ARMOR_DAMAGE_RESIST: v.number(),
		MODIFIER_VALUE_TECH_ARMOR_DAMAGE_RESIST: v.number(),
		MODIFIER_VALUE_TECH_DAMAGE_PERCENT: v.number(),
		MODIFIER_VALUE_TECH_POWER: v.number()
	})
});

export type Hero = v.InferOutput<typeof HeroSchema>;

export const HeroesSchema = v.array(HeroSchema);
