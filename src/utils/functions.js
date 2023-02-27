import axios from "axios";
import { useEffect, useState } from "react";
import api from '../services/api';

export async function get_pokemon(url) {
  try {
    // principal card //
    const response = await axios.get(url)
    const moreResponse= await axios.get(response.data.species.url)
    
    const id = response.data.id
    const name = response.data.name
    const typeNames = response.data.types.map(item => item.type.name)
    const sprites = response.data.sprites.other["official-artwork"].front_default
    // details //
    const weight = response.data.weight
    const height = response.data.height
    const habitat = moreResponse.data.habitat.name
    const flavor = moreResponse.data.flavor_text_entries[11].flavor_text

    
    const details = {
      url,
      id,
      name,
      typeNames,
      sprites,
      height,
      weight,
      habitat,
      flavor,
    }

    return details;
  } catch(err) {
    console.log(err)
  }
}


