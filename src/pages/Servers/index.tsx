import { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import Button from "../../components/Button";
import './style.css'
const Servers = () => {
  const [loading, setLoading] = useState(false);

  const handlePublishServer = async () => {
    setLoading(true);
    const user = getAuth().currentUser;
    console.log("works", user)
    if (!user) {
      alert("You must be logged in to publish a server.");
      setLoading(false);
      return;
    }

    const functions = getFunctions();
    const createPaymentLink = httpsCallable(functions, 'createStripeSession');

    console.log("test", createPaymentLink)

    try {
      const result:any = await createPaymentLink({ userId: user.uid, email: user.email });
      const paymentLink = result.data.paymentLink;

      window.location.href = paymentLink;
    } catch (error) {
      console.error('Error creating payment link:', error);
      alert("There was an error processing the payment link.");
    }
    setLoading(false);
  };

  return (
    <section className="servers">
        <Button onClick={handlePublishServer}>Publicar servidor</Button>
    </section>
 
)
};

export default Servers;
