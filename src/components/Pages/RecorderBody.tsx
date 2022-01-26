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

import { EuiFlexGroup, EuiFlexItem, EuiPageBody } from "@elastic/eui";
import React from "react";
import type { ActionContext, Setter } from "../../common/types";
import { Header } from "../Header";
import { HeaderControls } from "../Header/HeaderControls";
import { Title } from "../Header/Title";
import { StepsMonitor } from "../StepsMonitor";
import { TestResult } from "../TestResult";

interface IRecorderBody {
  isCodeFlyoutVisible: boolean;
  setIsCodeFlyoutVisible: Setter<boolean>;
  onUrlChange: (url: string) => void;
  url: string;
  stepActions: ActionContext[][];
}

const MAIN_CONTROLS_MIN_WIDTH = 600;

export function RecorderBody({
  isCodeFlyoutVisible,
  setIsCodeFlyoutVisible,
  onUrlChange,
  stepActions,
  url,
}: IRecorderBody) {
  return (
    <>
      <Title />
      <HeaderControls setIsCodeFlyoutVisible={setIsCodeFlyoutVisible} />
      <EuiPageBody>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFlexGroup direction="column">
              <EuiFlexItem grow={false}>
                <Header
                  url={url}
                  onUrlChange={onUrlChange}
                  stepCount={stepActions.length}
                />
              </EuiFlexItem>
              <EuiFlexItem style={{ minWidth: MAIN_CONTROLS_MIN_WIDTH }}>
                <StepsMonitor
                  isFlyoutVisible={isCodeFlyoutVisible}
                  setIsFlyoutVisible={setIsCodeFlyoutVisible}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem style={{ minWidth: 300 }}>
            <TestResult />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageBody>
    </>
  );
}
