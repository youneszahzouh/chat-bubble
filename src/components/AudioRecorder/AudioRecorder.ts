import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const mimeType: string = "audio/webm";

export type Interval = null | number | ReturnType<typeof setInterval>;

export const useAudioRecorder = () => {
  const { t } = useTranslation();

  const [permission, setPermission] = useState<boolean>(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<
    "inactive" | "recording"
  >("inactive");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const [blobFile, setBlobFile] = useState<Blob | null>(null);

  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let recordingInterval: Interval = null;

    if (recordingStatus === "recording")
      recordingInterval = setInterval(() => {
        setDuration(duration + 1000);
      }, 1000);
    else {
      typeof recordingInterval === "number" && clearInterval(recordingInterval);
    }

    return () => {
      typeof recordingInterval === "number" && clearInterval(recordingInterval);
    };
  }, [duration, recordingStatus]);

  const getMicPermissionThenStartRecording = async (): Promise<void> => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream: MediaStream =
          await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
          });
        setPermission(true);

        setStream(mediaStream);
        startRecording(mediaStream);
      } catch (err) {
        alert((err as Error).message);
      }
    } else {
      alert(t("the-mediarecorder-api-is-not-supported-in-your-browser"));
    }
  };

  const startRecording = async (strm?: MediaStream): Promise<void> => {
    if (strm || stream) {
      setRecordingStatus("recording");
      const media: MediaRecorder = new MediaRecorder(
        strm ?? (stream as MediaStream),
        {
          mimeType,
        },
      );

      mediaRecorder.current = media;

      mediaRecorder.current.start();

      const localAudioChunks: Blob[] = [];

      mediaRecorder.current.ondataavailable = (event: BlobEvent): void => {
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        localAudioChunks.push(event.data);
      };

      setAudioChunks(localAudioChunks);
    }
  };

  const startOrGetPermission = () => {
    if (!permission) {
      getMicPermissionThenStartRecording();
    } else {
      startRecording();
    }
  };

  const stopRecording = (): void => {
    setRecordingStatus("inactive");
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();

      mediaRecorder.current.onstop = () => {
        const audioBlob: Blob = new Blob(audioChunks, { type: mimeType });
        const audioUrl: string = URL.createObjectURL(audioBlob);

        setBlobFile(audioBlob);
        setAudio(audioUrl);

        setAudioChunks([]);
      };
    }
  };

  const resetAudio = useCallback(() => {
    setAudio(null);
    setBlobFile(null);
    setAudioChunks([]);
    setDuration(0);
  }, []);

  return {
    permission,
    setPermission,
    recordingStatus,
    setRecordingStatus,
    stream,
    setStream,
    audio,
    setAudio,
    audioChunks,
    setAudioChunks,
    startRecording: startOrGetPermission,
    stopRecording,
    resetAudio,
    setBlobFile,
    blobFile,
    duration,
  };

  //   return (
  //     <div>
  //       <h2>Audio Recorder</h2>
  //       <main>
  //         <div className="audio-controls">
  //           {!permission ? (
  //             <button onClick={getMicrophonePermission} type="button">
  //               Get Microphone
  //             </button>
  //           ) : null}
  //           {permission && recordingStatus === "inactive" ? (
  //             <button onClick={startRecording} type="button">
  //               Start Recording
  //             </button>
  //           ) : null}
  //           {recordingStatus === "recording" ? (
  //             <button onClick={stopRecording} type="button">
  //               Stop Recording
  //             </button>
  //           ) : null}
  //         </div>
  //         {audio ? (
  //           <div className="audio-player">
  //             <audio src={audio} controls></audio>
  //             <a download href={audio}>
  //               Download Recording
  //             </a>
  //           </div>
  //         ) : null}
  //       </main>
  //     </div>
  //   );
};
