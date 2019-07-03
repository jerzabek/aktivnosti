package design.jarza.aktivnosti;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Database {

  private static final String DB_URL = "jdbc:mysql://localhost:3306/aktivnosti?useSSL=false&useTimezone=true&serverTimezone=UTC";
  private static final String USER = "root";
  private static final String PASS = "root";

  private HikariDataSource dataSource;
  private Logger logger = LoggerFactory.getLogger(Database.class);

  private static final String GET_AKTIVNOSTI = "SELECT * FROM aktivnosti;";
  private static final String DELETE_AKTIVNOSTI = "DELETE FROM aktivnosti WHERE id = ?;";
  private static final String UPDATE_AKTIVNOST = "UPDATE aktivnosti WHERE id = ? SET naziv = \"?\" AND kategorija = \"?\" AND podkategorija = \"?\";";
  private static final String CREATE_AKTIVNOST = "INSERT INTO aktivnosti (naziv, kategorija, podkategorija) VALUES (?, ?, ?);";

  public Database() {
    HikariConfig config = new HikariConfig();

    config.setJdbcUrl(DB_URL);
    config.setUsername(USER);
    config.setPassword(PASS);
    config.addDataSourceProperty("prepStmtCacheSize", 200);
    config.addDataSourceProperty("prepStmtCacheSqlLimit", 1024);
    config.addDataSourceProperty("cachePrepStmts", true);
    config.addDataSourceProperty("useServerPrepStmts", true);
    config.setPoolName("AktivnostiDBPool");

    dataSource = new HikariDataSource(config);
  }

  private Connection getConnection() throws SQLException {
    return dataSource.getConnection();
  }

  public void closeConnections() {
    dataSource.close();
  }

  public ArrayList<Aktivnost> getAktivnosti() {
    ArrayList<Aktivnost> akt = new ArrayList<>();

    try (Connection c = getConnection();
         PreparedStatement s = c.prepareStatement(GET_AKTIVNOSTI);
         ResultSet rs = s.executeQuery()) {

      if (!rs.isBeforeFirst()) {
        return akt;
      }

      while (rs.next()) {
        akt.add(new Aktivnost(rs.getInt(1),
                        rs.getString(2),
                        rs.getString(3),
                        rs.getString(4)));
      }

    } catch (SQLException e) {
      logger.error(e.getMessage());
    }

    return akt;
  }

  public boolean deleteAktivnost(final int id) {
    boolean uspjeh = false;

    try (Connection c = getConnection();
         PreparedStatement s = c.prepareStatement(DELETE_AKTIVNOSTI)) {

      s.setInt(1, id);

      if(s.executeUpdate() > 0)
        uspjeh = true;

    } catch (SQLException e) {
      logger.error(e.getMessage());
    }

    return uspjeh;
  }

  public boolean updateAktivnost(final Aktivnost akt) {
    boolean uspjeh = false;

    try (Connection c = getConnection();
         PreparedStatement s = c.prepareStatement(UPDATE_AKTIVNOST)) {

      s.setInt(1, akt.getId());
      s.setString(2, akt.getNaziv());
      s.setString(3, akt.getKategorija());
      s.setString(4, akt.getPodkategorija());

      if(s.executeUpdate() > 0)
        uspjeh = true;

    } catch (SQLException e) {
      logger.error(e.getMessage());
    }

    return uspjeh;
  }

  public void createAktivnost(final Aktivnost akt) {
    try (Connection c = getConnection();
         PreparedStatement s = c.prepareStatement(CREATE_AKTIVNOST)) {

      s.setString(1, akt.getNaziv());
      s.setString(2, akt.getKategorija());
      s.setString(3, akt.getPodkategorija());

      s.executeUpdate();
    } catch (SQLException e) {
      logger.error(e.getMessage());
    }
  }
}
