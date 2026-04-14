import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactPage from '@/app/contact/page'; // Le bon chemin vers ton fichier

// On "simule" la réponse de ton fichier PHP pour ne pas envoyer de vrais emails pendant les tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ sent: true }),
  })
);

describe('Page de Transmission (Contact)', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // On réinitialise le fetch avant chaque test
  });

  it('1. doit afficher les champs du formulaire', () => {
    render(<ContactPage />);
    
    // Vérification de la présence des éléments
    expect(screen.getByText(/Transmission/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Votre Nom de Code/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contact@exemple.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contenu du signal.../i)).toBeInTheDocument();
  });

  it('2. doit permettre de remplir les champs', () => {
    render(<ContactPage />);
    
    const inputNom = screen.getByPlaceholderText(/Votre Nom de Code/i);
    
    // On simule un utilisateur qui tape sur son clavier
    fireEvent.change(inputNom, { target: { value: 'Agent 007' } });
    
    // On vérifie que la valeur a bien changé
    expect(inputNom.value).toBe('Agent 007');
  });

  it('3. doit soumettre le formulaire et afficher le succès', async () => {
    render(<ContactPage />);

    // Remplissage de tous les champs
    fireEvent.change(screen.getByPlaceholderText(/Votre Nom de Code/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByPlaceholderText(/contact@exemple.com/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Contenu du signal.../i), { target: { value: 'Message secret' } });

    // On clique sur le bouton d'envoi
    const bouton = screen.getByRole('button', { name: /Initialiser l'envoi/i });
    fireEvent.click(bouton);

    // On s'assure que le fetch (vers send-mail.php) a bien été appelé
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // On attend que l'animation passe et que le message de succès s'affiche
    await waitFor(() => {
      expect(screen.getByText(/Signal Reçu/i)).toBeInTheDocument();
    });
  });
});