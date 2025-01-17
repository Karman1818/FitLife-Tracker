interface PageProps {
  params: Promise<{
    id: string;
  }>
}

export const runtime = "edge";

export default async function Page(props: PageProps) {
  const id = (await props.params).id;
  
  return (
    <div>
      <div className="profile-container">
        <h1>Profil użytkownika</h1>
        <p>
          Witaj, użytkowniku <strong>{id}</strong>!
        </p>
        <div className="profile-stats">
          <h2>Twoje statystyki:</h2>
          <ul>
            <li>Waga: 70 kg</li>
            <li>Wzrost: 175 cm</li>
            <li>BMI: 22.86</li>
          </ul>
        </div>
        <div className="profile-meals">
          <h2>Ostatnie posiłki:</h2>
          <ul>
            <li>Śniadanie: Owsianka - 300 kcal</li>
            <li>Obiad: Kurczak z ryżem - 600 kcal</li>
            <li>Kolacja: Sałatka - 200 kcal</li>
          </ul>
        </div>
      </div>
    </div>
  );
};