export async function getSpells() {
  //gets all the spells from the DND api and returns them as JSON
  try {
    const response = await fetch("https://www.dnd5eapi.co/api/spells");
    return await response.json();
  } catch (e) {
    return e;
  }
}

export async function getSpellInfo(spell) {
  //gets the selected spell from the DND api and returns it as JSON, used for showing desc
  try {
    const response = await fetch(`https://www.dnd5eapi.co/api/spells/${spell}`);
    return await response.json();
  } catch (e) {
    return e;
  }
}
