import Validators from "../utils/Validators";
import { publish } from "./rabbit";

export default class SkillsEvents {
  public static async publishSkillCreated(skill: unknown) {
    if (!Validators.isValidSkill(skill)) {
      console.error("Invalid message");
    } else {
      await publish("skills.created", {
        event: "skills.created",
        data: skill,
      });
    }
  }
}
