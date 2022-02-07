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

import { RecordingStatus } from "../../common/types";
import { IRecordingContext } from "../../contexts/RecordingContext";
import { IStepsContext } from "../../contexts/StepsContext";
import { IUrlContext } from "../../contexts/UrlContext";

export const RECORDING_CONTEXT_DEFAULTS: IRecordingContext = {
  isStartOverModalVisible: false,
  setIsStartOverModalVisible: jest.fn(),
  recordingStatus: RecordingStatus.NotRecording,
  startOver: jest.fn(),
  togglePause: jest.fn(),
  toggleRecording: jest.fn(),
};

export const URL_CONTEXT_DEFAULTS: IUrlContext = {
  url: "",
  setUrl: jest.fn(),
};

export const STEPS_CONTEXT_DEFAULTS: IStepsContext = {
  steps: [],
  setSteps: jest.fn(),
  onDeleteAction: jest.fn(),
  onInsertAction: jest.fn(),
  onStepDetailChange: jest.fn(),
  onDeleteStep: jest.fn(),
  onUpdateAction: jest.fn(),
};