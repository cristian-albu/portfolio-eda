import type { Context } from "hono";
import SkillsRepository from "../../repositories/SkillsRepository";
import db from "../../db/Db";
import { PUBLIC_PATH } from "../../constants";
import List from "../components/List";

const skillsRepo = new SkillsRepository(db.getPortfolio());

const SkillsPage = async () => {
    const skills = await skillsRepo.findAll();

    return (
        <html>
            <head>
                <title>Skills</title>
                <link rel="stylesheet" href={`${PUBLIC_PATH}/style.css`} />
                <script
                    async
                    src={`${PUBLIC_PATH}/skills.js`}
                    type="module"
                ></script>
            </head>
            <body>
                <List data={skills.data} title="Skills" />
            </body>
        </html>
    );
};

export default async function serveSkillsPage(c: Context) {
    return c.html(<SkillsPage />);
}
