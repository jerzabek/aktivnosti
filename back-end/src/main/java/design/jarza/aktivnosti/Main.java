package design.jarza.aktivnosti;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Main {

  public static Database database;
  public static Webserver webserver;
  public static Logger logger = LoggerFactory.getLogger(Main.class);

  public static void main(String[] args) {
    logger.info("Server pokrenut");
    database = new Database();

    webserver = new Webserver(4567);
  }

}
