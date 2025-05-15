import AIChat from '../components/AIChat';

const AIAssistant = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Financial AI Assistant</h1>
      <p className="text-center text-muted-foreground mb-8">
        Get personalized financial advice and information to help you make better financial decisions.
      </p>
      <AIChat title="Unifinance UK Spark Assistant" />
    </div>
  );
};

export default AIAssistant;
