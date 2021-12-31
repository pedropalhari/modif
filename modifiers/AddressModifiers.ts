import fetch from "node-fetch";

async function viaCEP(value: string) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${value}/piped/`);
    const responseJSON = await response.text();

    console.log(responseJSON);

    return responseJSON;
  } catch (err) {
    console.log(err);
    return "null";
  }
}

export const AddressModifiers = {
  viaCEP,
};
