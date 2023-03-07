// Imports
import server from "./services/server";

// Constants
const PORT = process.env.PORT || 8080;

// Port listener
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
