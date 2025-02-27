import { auth } from "@/auth";
import AuthTest from "./AuthTest";

const Session = async () => {
  const session = await auth();
  return (
    <div>
      <header>
        <div className="bg-blue-200 border-2 border-blue-500">
          <h3 className="text-lg">Sesson data</h3>
          <pre className="whitespace-pre-wrap break-all">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </header>

      <div className="mt-4">
        <AuthTest />
      </div>
    </div>
  );
};

export default Session;
