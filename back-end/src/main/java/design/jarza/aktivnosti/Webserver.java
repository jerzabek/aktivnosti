package design.jarza.aktivnosti;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.ArrayList;

import static spark.Spark.*;

public class Webserver {

  public Webserver(int port) {
    port(port);

    path("/api", () -> {
      getHelloWorld();

      getShutDown();

      getAktivnosti();

      deleteAktivnost();

      updateAktivnost();

      createAktivnost();
    });

    notFound((req, res) -> {
      res.type("application/json");
      return "{\"message\":\"Page Not Found\"}";
    });
  }

  private void getHelloWorld() {
    get("/", (req, res) -> "Hello world");
  }

  private void getShutDown() {
    get("/shutdown", (req, res) -> {
      Main.logger.info("Server se gasi");
      stop();
      Main.database.closeConnections();
      System.exit(0);
      return "";
    });
  }

  private void getAktivnosti() {
    get("/aktivnosti", (req, res) -> {
      res.type("application/json");

      ArrayList<Aktivnost> aktivnosti = Main.database.getAktivnosti();

      JSONArray arr = new JSONArray();

      for (Aktivnost a : aktivnosti) {
        JSONObject temp = new JSONObject();

        temp.put("id", a.getId());
        temp.put("naziv", a.getNaziv());
        temp.put("kategorija", a.getKategorija());
        temp.put("podkategorija", a.getPodkategorija());

        arr.add(temp);
      }

      return arr.toJSONString();
    });
  }

  private void deleteAktivnost() {
    delete("/aktivnosti/:id", (req, res) -> {
      res.type("application/json");
      int id;

      try {
        id = Integer.parseInt(req.params(":id"));
      } catch (NumberFormatException e) {
        res.status(400);
        return "{\"message\":\"Bad ID in URL\"}";
      }

      boolean uspjeh = Main.database.deleteAktivnost(id);

      if(!uspjeh)
        res.status(404);

      return "{}";
    });
  }

  private void updateAktivnost() {
    put("/aktivnosti/:id", (req, res) -> {
      res.type("application/json");
      int id;

      try {
        id = Integer.parseInt(req.params(":id"));
      } catch (NumberFormatException e) {
        res.status(400);
        return "{\"message\":\"Bad ID in URL\"}";
      }

      String naziv = req.headers("naziv"),
              kate = req.headers("kategorija"),
              podkate = req.headers("podkategorija");

      if(naziv == null || kate == null || podkate == null ||
              naziv.length() > 10 || kate.length() > 20 || podkate.length() > 30 ||
              naziv.length() == 0 || kate.length() == 0 || podkate.length() == 0) {
        res.status(422);
        return "{\"message\":\"Fields aren't valid\"}";
      }

      Aktivnost ak = new Aktivnost(id, naziv, kate, podkate);

      boolean uspjeh = Main.database.updateAktivnost(ak);

      if(!uspjeh)
        res.status(404);

      return "{}";
    });
  }

  private void createAktivnost() {
    post("/aktivnosti", (req, res) -> {
      res.type("application/json");

      String naziv = req.headers("naziv"),
              kate = req.headers("kategorija"),
              podkate = req.headers("podkategorija");

      if(naziv == null || kate == null || podkate == null ||
              naziv.length() > 10 || kate.length() > 20 || podkate.length() > 30 ||
              naziv.length() == 0 || kate.length() == 0 || podkate.length() == 0) {
        res.status(422);
        return "{\"message\":\"Fields aren't valid\"}";
      }

      Aktivnost ak = new Aktivnost(0, naziv, kate, podkate);

      Main.database.createAktivnost(ak);

      return "{}";
    });
  }
}
