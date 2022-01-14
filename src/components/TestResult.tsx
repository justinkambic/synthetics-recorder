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

import React, { useContext, useEffect, useState } from "react";
import {
  EuiAccordion,
  EuiCodeBlock,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiIcon,
  EuiText,
  EuiTitle,
  useEuiTheme,
} from "@elastic/eui";
import { StepsContext } from "../contexts/StepsContext";
import type {
  Journey,
  JourneyStep,
  Result,
  ResultCategory,
} from "../common/types";
import { TestContext } from "../contexts/TestContext";
import { getCodeFromActions } from "../common/shared";

const symbols: Record<ResultCategory, JSX.Element> = {
  succeeded: <EuiIcon color="success" type="check" />,
  failed: <EuiIcon color="danger" type="alert" />,
  skipped: <EuiIcon color="warning" type="flag" />,
};

function removeColorCodes(str = "") {
  // eslint-disable-next-line no-control-regex
  return str.replace(/\u001b\[.*?m/g, "");
}

interface IResultAccordions {
  codeBlocks: string;
  journey: Journey;
}

function ResultAccordions({ codeBlocks, journey }: IResultAccordions) {
  const [isVisible, setIsVisible] = React.useState(false);

  return isVisible ? (
    <EuiFlyout onClose={() => setIsVisible(false)}>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="s">
          <h2 id="result-flyout-title">Journey Test Result</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        {journey.steps.map((step: JourneyStep, stepIndex: number) => {
          const { name, status, error, duration } = step;
          return (
            <EuiAccordion
              id={step.name}
              key={stepIndex}
              arrowDisplay="none"
              forceState={status === "failed" ? "open" : "closed"}
              buttonContent={
                <EuiFlexGroup alignItems="center">
                  <EuiFlexItem grow={false}>{symbols[status]}</EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiText size="s" style={{ fontWeight: 500 }}>
                      {name} ({duration} ms)
                    </EuiText>
                  </EuiFlexItem>
                </EuiFlexGroup>
              }
              paddingSize="s"
              buttonClassName="euiAccordionForm__button"
            >
              {error && (
                <>
                  <EuiCodeBlock
                    language="js"
                    paddingSize="m"
                    style={{ maxWidth: 300 }}
                    transparentBackground={true}
                  >
                    {codeBlocks ?? null}
                  </EuiCodeBlock>
                  <EuiCodeBlock paddingSize="m" transparentBackground={true}>
                    {removeColorCodes(error.message)}
                  </EuiCodeBlock>
                </>
              )}
            </EuiAccordion>
          );
        })}
      </EuiFlyoutBody>
    </EuiFlyout>
  ) : null;
}

export function TestResult() {
  const { steps } = useContext(StepsContext);
  const { codeBlocks, result, setResult } = useContext(TestContext);
  const [stepCodeToDisplay, setStepCodeToDisplay] = useState("");

  console.log("results", result);
  console.log("steps", steps);
  console.log("failed code", stepCodeToDisplay);

  useEffect(() => {
    async function fetchCodeForFailure(r: Result) {
      const failedCode = await getCodeFromActions(
        [steps[r.succeeded]],
        "inline"
      );
      setStepCodeToDisplay(failedCode);
    }
    if (steps.length === 0 && result) setResult(undefined);
    if (steps.length && result) {
      fetchCodeForFailure(result);
    }
  }, [steps, result, setResult]);

  // const {
  //   euiTheme: {
  //     colors: { danger, success, warning },
  //   },
  // } = useEuiTheme();

  // const styles: Record<ResultCategory, { color: string }> = {
  //   succeeded: { color: success },
  //   failed: { color: danger },
  //   skipped: { color: warning },
  // };

  // const text: Record<
  //   ResultCategory,
  //   "success" | "error" | "errors" | "skipped"
  // > = {
  //   succeeded: "success",
  //   failed: result?.failed === 1 ? "error" : "errors",
  //   skipped: "skipped",
  // };

  if (!result) return null;
  const total = result.succeeded + result.skipped + result.failed;
  if (total === 0) return null;

  return result ? (
    <EuiFlyout
      aria-labelledby="result-flyout-title"
      onClose={() => setResult(undefined)}
      size={result.failed === 0 ? "m" : "l"}
    >
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="s">
          <h2 id="result-flyout-title">Journey Test Result</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        {result.journey.steps.map((step: JourneyStep, stepIndex: number) => {
          const { name, status, error, duration } = step;
          return (
            // you were trying to implement an accordion that shows the code of a test failure
            // or shows the successful step name
            <EuiAccordion
              arrowDisplay={error ? "left" : "none"}
              id={step.name}
              key={stepIndex}
              buttonContent={
                <EuiFlexGroup alignItems="center">
                  <EuiFlexItem grow={false}>{symbols[status]}</EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiText size="s" style={{ fontWeight: 500 }}>
                      {name} ({duration} ms)
                    </EuiText>
                  </EuiFlexItem>
                </EuiFlexGroup>
              }
              paddingSize="s"
              buttonClassName="euiAccordionForm__button"
            >
              {error && (
                <>
                  <EuiCodeBlock
                    language="js"
                    paddingSize="m"
                    style={{ maxWidth: 300 }}
                    transparentBackground={true}
                  >
                    {stepCodeToDisplay}
                  </EuiCodeBlock>
                  <EuiCodeBlock paddingSize="m" transparentBackground={true}>
                    {removeColorCodes(error.message)}
                  </EuiCodeBlock>
                </>
              )}
            </EuiAccordion>
          );
        })}
      </EuiFlyoutBody>
    </EuiFlyout>
  ) : null;
}
