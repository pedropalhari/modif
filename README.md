# **modif** (🍖👉🥪)

`modif` is a small GraphQL API with transform capabilities. It takes a `string` input and outputs a `string`. Always.

## TL;DR

- Go play with it at https://modif.palhari.dev

## Examples

Some cool examples to start you by:

- [Uppercase a string](https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Fmodif.palhari.dev%2F&explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAKoAOZ%2BUAhgM4IDKKeAlkgOYAUAJAG7UAbXOiJNWHAIQBKIsAA6SIkTgQwLAGYFO-IQhF9BuGfMVKiMClToJZCs2Z247ZgL7O3SFyAA0Ifq2oAIwEEWgwQEyU5P0MEaJFolgByOCJqIgEIAHcreiJaZjZ2aIUvFyA)

```graphql
# Operation
query UppercaseString($value: String!) {
  modify(value: $value) {
    uppercase {
      value
    }
  }
}

# Variables
{
  "value": "i'm a lowercase string"
}
```

- [Get the domain of a properly positioned email address](https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Fmodif.palhari.dev%2F&explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAOIIoCicAhgJYA2AgmGHggM7sAiENtSACgA6SIkQAkAN2r1c6IgGUUefgHMAhCLHjqeVQEZ5SlUg1aJUCEijUUjPYcXK1mpAEoiwc3AhhaAMwIBaVkEeSkZXA8vUTEidhRdFHYBXQNwtP1o8ziiNh9JBAB1AAtaFAQFAAdqKARPHNyiS2tbVIdwlps7B2zYpriQ3EbcgF8RonH%2ByfMpqZAAGhBpFWoAI3oODBAYsSFlyIR9%2BX2AWWIEPnoiahY2TiJadiIqhFYIAAEa%2BhLdWgA6MAIST7BbmfaZY5EfYfUHgkBdWz2AxQ-aPZ4oEr1S50a63VgcdgAciIkD4SH2IlGIFGQA)

```graphql
# Operation
query GetEmailAddressDomain(
  $value: String!
  $arg1: String!
  $concatArg1: String!
) {
  modify(value: $value) {
    starts(arg1: $arg1) {
      removeWhiteSpace {
        concat(arg1: $concatArg1) {
          value
        }
      }
    }
  }
}

# Variables
{
  "value": "My email address is pedro@palhari.dev",
  "arg1": "@",
  "concatArg1": " is the email address' domain"
}
```

- [Get the address of a CEP (Brazilian-specific Zip Code)](https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Fmodif.palhari.dev%2F&explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAOIIoDKKeC5AcgIaIBieEcAwgKIAKAFAB0kRIgBIAbgwA2udESp4AlkgDmAQiEjRDPCoCMchcvWaxOlQCZD1YxuFioEJFAYoAgroPybquwEoiYFM4CDBFADMCPkkZBDkJaVwAoPsRJykCOngAI3wAZ0DTERFxRQZuHkLU4pFclAB3WiQ%2Bcy9tTwAaInMrM10LZKKa4sdnVxbPeNGXd09B6uHimNwhxYBfVeKNhaJtmr3doW2QDpBJJQZsqQQ8jBAUkQEzxIQnuSeAWWIACwgYPIQREUBSk0FcCDA3RQRD0AFYAMwAdgADABaAAsAE4AGxPDqmJ6tN5EJ6glR4BiQGBsdB4gkgHrEp4AHzp9ie01cHn0TJAQIKKG%2BgLy1Fo0IAkkQpIpxK8QEcQGsgA)
  - Using https://viacep.com.br/

```graphql
# Operation
query GetStreetNameFromCEP(
  $value: String!
  $arg1: String!
  $arg2: String!
  $concatArg1: String!
) {
  modify(value: $value) {
    onlyNumbers {
      viaCEP {
        between(arg1: $arg1, arg2: $arg2) {
          concat(arg1: $concatArg1) {
            value
          }
        }
      }
    }
  }
}

# Variables
{
  "value": "My house is located at 15370-496",
  "arg1": "logradouro:",
  "arg2": "|",
  "concatArg1": " is the street I live"
}
```

## How does it work

Using GraphQL attribute resolving as a runtime recursive transformer of the input. The GraphQL server is made of a single Object called `ModifierObject`.

Inside `ModifierObject` all the modifiers are declared and return their own `ModifierObject`. The only static variable is the `value`, a string.

Attributes are resolved at runtime using an obscure function attribute called `length`. This allows me to generate the arguments for this function when the server boots up.

You can check all of that, under great detail and in a manifesto-kinda way of programming on `graphql/GraphQLModifiers.ts`.

## Contributing

Have a great idea or want to add more modifiers to it? Check out `modifiers/StringModifiers.ts` and make sure you read the concept on `graphql/GraphQLModifiers.ts` to know what I want this to eventually end.

## Running locally

- Clone the repo
- `yarn`
- Either `node pm2.js` or `yarn dev:g`
  - The latter is prefered as it has `nodemon` and `--enable-source-maps` capabilities.
  - A server will spawn under `http://localhost:6780`, navigate to it to query the API

## Early FAQ

- Hey, why don't you use `X` instead of Apollo Studio Sandbox?

I like the Sandbox. It's visually great, let me do a lot of work visually.

- Why can't I do `Y`?

Very _very_ early stage toy. But check [Contributing](#contributing) up above and make yourself at home.
