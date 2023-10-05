import { FC, useRef, ChangeEvent, useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaFileDownload } from "react-icons/fa";
import * as Styled from "./styles";

import { Stages } from "../../types/Stages";
import { Users } from "../../types/Users";
import api from "../../services/callsApi";

import { getSportIcon } from "../../utils";
import { useDebounce } from "../../hooks/useDebounce";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

const Home: FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [stage, setStage] = useState<Stages>();
  const [users, setUsers] = useState<Users[]>([]);
  const [search, setSearch] = useState<string>("");

  const debouncedSearchTerm = useDebounce(search, 200);

  /**
   * Fetch all users
   */
  const fetchAllUsers = async () => {
    api.getAll(search).then((response) => {
      if (response.data.length > 0) {
        setUsers(response.data);
        setStage(Stages.LOADED);
      } else if (response.data.length === 0 && stage !== undefined) {
        setUsers([]);
        setStage(Stages.LOADED);
      } else {
        setUsers([]);
        setStage(Stages.INIT);
      }
    });
  };

  // Search with debounce
  useEffect(() => {
    fetchAllUsers();
  }, [debouncedSearchTerm]);

  /**
   * Handles the file changing
   *
   * @param { React.DragEvent<HTMLDivElement> } e The event
   */
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length <= 1) {
      const selectedFile: File = e.target.files[0];
      await processUpload(selectedFile);
    } else {
      toast.error("Only one file per upload is allowed");
    }
  };

  /**
   * Processes the upload call to server
   *
   * @param selectedFile The file we're uploading
   */
  const processUpload = async (selectedFile: File) => {
    await api
      .uploadFile(selectedFile)
      .then((res) => {
        setUsers(res.data.data);
        setStage(Stages.LOADED);
        toast.success("File successfully uploaded!");
      })
      .catch((err) => {
        if (err.response.data.includes("Only CSV files are allowed!")) {
          toast.error("Only CSV files are allowed!");
        } else {
          toast.error("Something unexpected happened");
        }
      });
  };

  /**
   * Handles the file dropping
   *
   * @param { React.DragEvent<HTMLDivElement> } e The event
   */
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    await processUpload(droppedFiles[0]);
  };

  /**
   * Handles the drag over
   *
   * @param { React.DragEvent<HTMLDivElement> } e The event
   */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  /**
   * Handles the drag leaving
   */
  const handleDragLeave = () => {
    setDragging(false);
  };

  /**
   * Handles the deletion of the file
   */
  const handleDeletion = async () => {
    await api
      .deleteFile()
      .then((res) => {
        setUsers([]);
        setStage(Stages.INIT);
        toast.info("File successfully deleted, you can now upload another.");
      })
      .catch((err) => {});
  };

  return stage === Stages.INIT ? (
    <>
      <Styled.Wrapper>
        <Styled.Header style={{ marginBottom: "15px" }}>
          Data Importing
        </Styled.Header>
        <Styled.Row>
          <Styled.DesiredData>
            To import users in our platform, you must use our template and fill
            in with your informations, here they are if you don&apos;t know:
            <div style={{ marginTop: "15px" }}>- Name</div>
            <div>- City</div>
            <div>- Country</div>
            <div style={{ marginBottom: "15px" }}>- Favorite Sport</div>
            <Styled.Button data-testid="download-template" href="/files/test.csv" download>
              Download template <FaFileDownload style={{ marginLeft: "5px" }} />
            </Styled.Button>
          </Styled.DesiredData>

          <Styled.ImportFile
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            dragging={dragging || undefined}
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.click();
              }
            }}
          >
            <Styled.ExportIcon />
            <div>Click to select a .csv file from your computer</div>
            or
            <div>Drag your file here</div>
            <Styled.Select>
              <Styled.Upload
                data-testid="import"
                onChange={handleFileChange}
                ref={inputRef}
                type="file"
                accept=".csv"
              />
            </Styled.Select>
          </Styled.ImportFile>
        </Styled.Row>
      </Styled.Wrapper>
    </>
  ) : stage === Stages.LOADED && users ? (
    <Styled.Wrapper>
      <Styled.Actions>
        <Styled.Header>Users</Styled.Header>
        <Styled.Close onClick={() => handleDeletion()} />
      </Styled.Actions>
      <Styled.WrapperCard>
        <Styled.Search
          data-testid="search"
          type="search"
          value={search}
          placeholder="Search for any data"
          onChange={(e) => setSearch(e.target.value)}
        />

        <Styled.UserCards>
          {users?.length ? (
            users?.map((user: Users, index) => {
              return (
                <Styled.Card data-testid="user-card" key={`${user.name + index}`}>
                  <Styled.Name>{user.name}</Styled.Name>
                  <FaLocationDot /> {user.city}, {user.country}
                  <Styled.Sport>
                    {getSportIcon(user.favorite_sport?.toLowerCase())}
                    {user.favorite_sport}
                  </Styled.Sport>
                </Styled.Card>
              );
            })
          ) : (
            <>No users were found with this search query.</>
          )}
        </Styled.UserCards>
      </Styled.WrapperCard>
      <div></div>
    </Styled.Wrapper>
  ) : (
    <Loading />
  );
};

export default Home;
