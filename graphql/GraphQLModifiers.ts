import { arg, extendType, nonNull, objectType, stringArg } from "nexus";
import { ArgsRecord, Maybe } from "nexus/dist/core";
import { CaseModifiers } from "../modifiers/CaseModifiers";
import { DateModifiers } from "../modifiers/DateModifiers";
import { RegexModifiers } from "../modifiers/RegexModifiers";
import { StringModifiers } from "../modifiers/StringModifiers";

/**
 * This file reads all the modifiers and create structures from them.
 * Some rules:
 *
 * - All parameters must be string
 * - All modifiers return string
 * - A modifier must have at minimum 1 parameter and at max 3 parameters (1 default, 2 extra)
 * - The first parameter is the parent's value, called "value". The modifier will act upon this (the first) parameter
 * - All additional parameters are detected via the Function.length helper
 *   and are named arg${1..3}
 */

// Map for all modifiers
const ALL_MODIFIERS = {
  ...DateModifiers,
  ...CaseModifiers,
  ...RegexModifiers,
  ...StringModifiers,
};

const ModifierObject = objectType({
  name: "ModifierObject",
  definition: (t) => {
    t.nonNull.string("value");

    // Traverse all modifiers
    Object.keys(ALL_MODIFIERS).forEach((param) => {
      // Little typecast here to get the modifier
      const modifierOperationName = param as keyof typeof ALL_MODIFIERS;
      const modifier = ALL_MODIFIERS[modifierOperationName];

      // Build the argument for the GraphQL schema. If the function accepts more arguments,
      // expose it on the schema
      const args: Maybe<ArgsRecord> = {};
      if (modifier.length > 1) {
        // This modifier requires more arguments than the default parents value
        // The end result is { arg1: ..., arg2: ..., ...}
        [...new Array(modifier.length - 1)].forEach(
          (_, i) => (args[`arg${i + 1}`] = nonNull(stringArg()))
        );
      }

      t.field(modifierOperationName, {
        type: "ModifierObject",
        args,
        resolve: (root, args) => ({
          //@ts-ignore
          value: modifier(root.value, ...Object.values(args)),
        }),
      });
    });
  },
});

const ModifierQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("modify", {
      type: "ModifierObject",
      args: {
        value: nonNull(stringArg()),
      },
      resolve: (_root, args) => args,
    });
  },
});

export const GraphQLModifiers = {
  ModifierObject,
  ModifierQuery,
};
