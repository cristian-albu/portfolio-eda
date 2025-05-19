export default class Validators {
  public static isValidSkill(skill: unknown) {
    if (typeof skill !== "object" || skill === null) {
      return false;
    }

    if (
      !("id" in skill) ||
      !("title" in skill) ||
      !("description" in skill) ||
      !("image" in skill) ||
      !("created_at" in skill) ||
      !("updated_at" in skill)
    ) {
      return false;
    }

    if (typeof skill.id !== "number") {
      return false;
    }

    for (const field in [skill.title, skill.description, skill.image, skill.created_at, skill.updated_at]) {
      if (typeof field !== "string") return false;
    }

    return true;
  }
}
