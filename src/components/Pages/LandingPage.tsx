/*
MIT License

Copyright (c) 2021-present, Elastic NV

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
import { EuiPageBody } from "@elastic/eui";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { RecordingContext } from "../../contexts/RecordingContext";
import { RecordingStatus, Setter } from "../../common/types";
import { Routes } from "../../common/shared";

interface ILandingPage {
  setUrl: Setter<string>;
  url: string;
}

export function LandingPage({ url, setUrl }: ILandingPage) {
  const { recordingStatus, toggleRecording } = useContext(RecordingContext);
  const navigate = useNavigate();
  return (
    <EuiPageBody style={{ height: "inherit" }}>
      {/* These are placeholder elements pending the creation of a design issue,
      and the required assets for the background. */}
      <div>Welcome to Elastic Script Recorder!</div>
      <input
        id="landing-page-url-input"
        type="text"
        placeholder="Enter URL to test"
        onChange={e => setUrl(e.target.value)}
      />
      <button
        disabled={!url}
        onClick={() => {
          if (recordingStatus === RecordingStatus.NotRecording) {
            toggleRecording();
          }
          navigate(Routes.main);
        }}
      >
        Start recording
      </button>
    </EuiPageBody>
  );
}
