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
    <aside className="max-h-[42vh] w-full shrink-0 overflow-y-auto border-b border-zinc-800 bg-zinc-950 lg:h-screen lg:max-h-none lg:w-[340px] lg:border-b-0 lg:border-r">
      <div className="space-y-6 p-4 sm:p-5">

        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Sessions
          </h2>

          <SessionList
            activeSession={activeSession}
            onSelect={onSelectSession}
          />
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Upload PDF
          </h2>

          <UploadZone />
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Documents
          </h2>

          <DocumentList />
        </section>

      </div>
    </aside>
  );
};

export default Sidebar;
