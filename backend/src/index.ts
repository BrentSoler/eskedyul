import AnnouncementRoutes from "./Announcement/router";
import BrgyRoutes from "./Brgy/router";
import db from "./config/db";
import ErrHandler from "./middleWare/errHandler";
import ProgramsRoutes from "./Programs/router";
import ScheduleRoutes from "./Schedule/router";
import TransactionRoutes from "./Transactions/router";
import UserRoutes from "./User/router";
const { app, PORT, server } = db;

app.use("/user", UserRoutes(server.Router()));

app.use("/program", ProgramsRoutes(server.Router()));
app.use("/schedule", ScheduleRoutes(server.Router()));
app.use("/transaction", TransactionRoutes(server.Router()));
app.use("/brgy", BrgyRoutes(server.Router()));
app.use("/announcements", AnnouncementRoutes(server.Router()));

app.listen(process.env.PORT || PORT, () => {
  console.log("CONNECTED");
});

app.use(ErrHandler);
