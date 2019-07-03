package design.jarza.aktivnosti;

public class Aktivnost {


  private int id;
  private String naziv, kategorija, podkategorija;

  public Aktivnost(int id, String naziv, String kategorija, String podkategorija) {
    this.id = id;
    this.naziv = naziv;
    this.kategorija = kategorija;
    this.podkategorija = podkategorija;
  }

  public int getId() {
    return id;
  }

  public String getNaziv() {
    return naziv;
  }

  public String getKategorija() {
    return kategorija;
  }

  public String getPodkategorija() {
    return podkategorija;
  }
}
