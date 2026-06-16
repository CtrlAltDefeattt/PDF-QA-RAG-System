import SessionList from "../sessions/SessionList";
import UploadZone from "../documents/UploadZone";
import DocumentList from "../documents/DocumentList";

interface Props {
  activeSession?: number;
  onSelectSession: (id: number) => void;
}

const Sidebar = ({
  activeSession,
  onSelectSession
}: Props) => {
  return (
    <aside className="w-[340px] border-r border-zinc-800 bg-zinc-950 overflow-y-auto">
      <div className="p-5 space-y-6">

        <section>
          <h2 className="font-semibold mb-3">
            Sessions
          </h2>

          <SessionList
            activeSession={activeSession}
            onSelect={onSelectSession}
          />
        </section>

        <section>
          <h2 className="font-semibold mb-3">
            Upload PDF
          </h2>

          <UploadZone />
        </section>

        <section>
          <h2 className="font-semibold mb-3">
            Documents
          </h2>

          <DocumentList />
        </section>

      </div>
    </aside>
  );
};

export default Sidebar;