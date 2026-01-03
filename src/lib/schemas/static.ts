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
export type Heroes = v.InferOutput<typeof HeroesSchema>;

export const ItemSchema = v.object({
	id: v.number(),
	// type: v.picklist(['weapon', 'ability', 'upgrade']),
	type: v.string(),
	class_name: v.string(),
	name: v.string(),
	item_tier: v.number(),
	// start_trained: v.boolean(),
	// image: v.optional(v.string(), ''),
	// image_webp: v.optional(v.string(), '')
	shop_image: v.optional(v.string(), ''),
	shop_image_webp: v.optional(v.string(), ''),
	shop_image_small: v.optional(v.string(), ''),
	shop_image_small_webp: v.optional(v.string(), ''),
	disabled: v.optional(v.boolean(), false),
	description: v.object({
		desc: v.optional(v.string(), '')
	}),
	activation: v.string(),
	is_active_item: v.boolean(),
	shopable: v.boolean(),
	cost: v.number(),
	item_slot_type: v.picklist(['vitality', 'spirit', 'weapon'])
	// heroes: [],
	// properties: v.object({
	// 	AbilityCooldown: v.object({
	// 		value: v.number(),
	// 		can_set_token_override: v.boolean(),
	// 		css_class: v.string(),
	// 		disable_value: v.number(),
	// 		scale_function: v.object({
	// 			class_name: v.string(),
	// 			subclass_name: v.string(),
	// 			specific_stat_scale_type: v.string(),
	// 		}),
	// 		label: v.string(),
	// 		postfix: v.string(),
	// 		postvalue_label: v.string(),
	// 		icon: v.string()
	// 	}),
	// 	AbilityDuration: v.object({
	// 		value: v.string(),
	// 		can_set_token_override: v.boolean(),
	// 		css_class: v.string(),
	// 		disable_value: v.number(),
	// 		scale_function: v.object({
	// 			class_name: v.string(),
	// 			subclass_name: v.string(),
	// 			specific_stat_scale_type: v.string(),
	// 		}),
	// 		label: v.string(),
	// 		postfix: v.string(),
	// 		postvalue_label: v.string(),
	// 		icon: v.string()
	// 	}),
	// 	AbilityCastRange: v.object({
	// 		value: v.string(),
	// 		can_set_token_override: v.boolean(),
	// 		css_class: v.string(),
	// 		display_units: v.string(),
	// 		scale_function: v.object({
	// 			class_name: v.string(),
	// 			subclass_name: v.string(),
	// 			specific_stat_scale_type: v.string(),
	// 		}),
	// 		label: v.string(),
	// 		postfix: v.string(),
	// 		postvalue_label: v.string(),
	// 		icon: v.string()
	// 	}),
	// 	AbilityUnitTargetLimit: v.object({
	// 		value: v.string(),
	// 		can_set_token_override: v.boolean(),
	// 	}),
	// 	AbilityCastDelay: v.object({
	// 		value: v.string(),
	// 		can_set_token_override: v.boolean(),
	// 		css_class: v.string(),
	// 		disable_value: v.string(),
	// 		label: v.string(),
	// 		postfix: v.string(),
	// 		postvalue_label: v.string(),
	// 		icon: v.string()
	// 	}),
	// 	AbilityChannelTime: v.object({
	// 		value: v.string(),
	// 		can_set_token_override: v.boolean(),
	// 		css_class: v.string(),
	// 		disable_value: v.number(),
	// 		scale_function: v.object({
	// 			class_name: v.string(),
	// 			subclass_name: v.string(),
	// 			scaling_stats: v.array(v.string()),
	// 		}),
	// 		label: v.string(),
	// 		postfix: v.string(),
	// 		postvalue_label: v.string(),
	// 		icon: v.string()
	// 	}),
	// 	AbilityPostCastDuration: v.object({
	// 		value: v.string(),
	// 		disable_value: v.number(),
	// 	}),
	// 	AbilityCharges: v.object({
	// 		value: v.string(),
	// 		can_set_token_override: v.boolean(),
	// 		css_class: v.string(),
	// 		disable_value: v.number(),
	// 		scale_function: v.object({
	// 			class_name: v.string(),
	// 			subclass_name: v.string(),
	// 			specific_stat_scale_type: v.string(),
	// 		}),
	// 		label: v.string(),
	// 		postvalue_label: v.string(),
	// 		icon: v.string()
	// 	}),
	// 	AbilityCooldownBetweenCharge: v.object({
	// 		value: v.string(),
	// 		can_set_token_override: v.boolean(),
	// 		css_class: v.string(),
	// 		disable_value: v.number(),
	// 		scale_function: v.object({
	// 			class_name: v.string(),
	// 			subclass_name: v.string(),
	// 			specific_stat_scale_type: v.string(),
	// 		}),
	// 		label: v.string(),
	// 		postfix: v.string(),
	// 		postvalue_label: v.string(),
	// 		icon: v.string()
	// 	}),
	// 	ChannelMoveSpeed: v.object({
	// 		value: v.string(),
	// 		can_set_token_override: v.boolean(),
	// 		css_class: v.string(),
	// 		display_units: v.string(),
	// 		postfix: v.string(),
	// 		icon: v.string()
	// 	}),
	// 	AbilityResourceCost: v.object({
	// 		value: v.string(),
	// 		can_set_token_override: v.boolean(),
	// 		css_class: v.string(),
	// 		disable_value: v.number(),
	// 		icon: v.string()
	// 	}),
	// 	TechPower: v.object({
	// 		value: v.string(),
	// 		can_set_token_override: v.boolean(),
	// 		provided_property_type: v.string(),
	// 		disable_value: v.number(),
	// 		prefix: v.string(),
	// 		label: v.string(),
	// 		postfix: v.string(),
	// 		postvalue_label: v.string()
	// 	}),
	// 	WeaponPower: v.object({
	// 		value: v.string(),
	// 		can_set_token_override: v.boolean(),
	// 		provided_property_type: v.string(),
	// 		disable_value: v.number(),
	// 		prefix: v.string(),
	// 		label: v.string(),
	// 		postfix: v.string(),
	// 		postvalue_label: v.string()
	// 	}),
	// }),
	// weapon_info: v.object({
	// 	can_zoom: v.boolean(),
	// 	bullet_damage: v.number(),
	// 	bullet_gravity_scale: v.number(),
	// 	bullet_inherit_shooter_velocity_scale: v.number(),
	// 	bullet_lifetime: v.number(),
	// 	bullet_radius: v.number(),
	// 	bullet_reflect_amount: v.number(),
	// 	bullet_reflect_scale: v.number(),
	// 	bullet_whiz_distance: v.number(),
	// 	burst_shot_cooldown: v.number(),
	// 	crit_bonus_end: v.number(),
	// 	crit_bonus_end_range: v.number(),
	// 	crit_bonus_start: v.number(),
	// 	crit_bonus_start_range: v.number(),
	// 	cycle_time: v.number(),
	// 	damage_falloff_bias: v.number(),
	// 	damage_falloff_end_range: v.number(),
	// 	damage_falloff_end_scale: v.number(),
	// 	damage_falloff_start_range: v.number(),
	// 	damage_falloff_start_scale: v.number(),
	// 	horizontal_punch: v.number(),
	// 	range: v.number(),
	// 	bullet_speed: v.number(),
	// 	recoil_recovery_speed: v.number(),
	// 	recoil_shot_index_recovery_time_factor: v.number(),
	// 	recoil_speed: v.number(),
	// 	reload_move_speed: v.number(),
	// 	scatter_yaw_scale: v.number(),
	// 	shoot_move_speed_percent: v.number(),
	// 	shoot_spread_penalty_decay: v.number(),
	// 	shoot_spread_penalty_decay_delay: v.number(),
	// 	shoot_spread_penalty_per_shot: v.number(),
	// 	shooting_up_spread_penalty: v.number(),
	// 	vertical_punch: v.number(),
	// 	zoom_move_speed_percent: v.number(),
	// 	bullets: v.number(),
	// 	burst_shot_count: v.number(),
	// 	clip_size: v.number(),
	// 	reload_duration: v.number(),
	// 	horizontal_recoil: v.object({
	// 		range: v.array(v.number()),
	// 		burst_exponent: v.number()
	// 	}),
	// 	shots_per_second: v.number(),
	// 	shots_per_second_with_reload: v.number(),
	// 	bullets_per_second: v.number(),
	// 	bullets_per_second_with_reload: v.number(),
	// 	damage_per_second: v.number(),
	// 	damage_per_second_with_reload: v.number(),
	// 	damage_per_shot: v.number(),
	// 	damage_per_magazine: v.number()
	// }),
});
export type Item = v.InferOutput<typeof ItemSchema>;

export const ItemsSchema = v.array(ItemSchema);
export type Items = v.InferOutput<typeof ItemsSchema>;
