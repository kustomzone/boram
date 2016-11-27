/**
 * Codecs tab.
 * @module boram/encoder/codecs
 */

import React from "react";
import {useSheet} from "../jss";
import {
  HelpPane,
  Prop, SmallInput,
  SmallSelect, MenuItem,
  InlineCheckbox, Sep,
  ArgsInput,
} from "../theme";

const HELP = {
  start: [
    "Start time",
    `Time of the fragment start.`,
  ], end: [
    "End time",
    `Time of the fragment end.`,
  ], limit: [
    "Limit/video bitrate",
    `In limit mode specifies the target file size in megabytes.
     Video bitrate in kbits otherwise.
     Set to 8/1000 by default respectfully.`,
  ], quality: [
    "Video quality",
    `Generally useful for CRF mode and short clips.
     0÷63 for VP9 ("0" is lossless), 4÷63 for VP8.
     "25" is good value and thus default in CRF mode.`,
  ], ab: [
    "Audio bitrate/quality",
    `Specifies bitrate in kbits for Opus codec or quality for Vorbis.
     Ranges and defaults are 6÷510/-1÷10, 128/4 respectfully`,
  ],
};

@useSheet({
  outer: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
  },
  valueCheck: {
    lineHeight: "48px",
  },
  nameArgs: {
    verticalAlign: "top",
  },
})
export default class extends React.PureComponent {
  render() {
    const {classes} = this.sheet;
    return (
      <div className={classes.outer}>
        <HelpPane
          help={HELP}
          focused={this.props.focused}
          errors={this.props.errors}
        >
          <Prop name="fragment">
            <SmallInput
              ref="start"
              width={75}
              hintText="start"
              onFocus={this.props.makeFocuser("start")}
              onBlur={this.props.onUpdate}
            />
            <Sep>÷</Sep>
            <SmallInput
              ref="end"
              hintText="end"
              width={75}
              onFocus={this.props.makeFocuser("end")}
              onBlur={this.props.onUpdate}
            />
          </Prop>
          <Prop name="video codec">
            <SmallSelect
              width={75}
              value={this.props.vcodec}
              onChange={this.props.makeSelecter("vcodec")}
            >
              <MenuItem value="vp9" primaryText="vp9" />
              <MenuItem value="vp8" primaryText="vp8" />
            </SmallSelect>
            <Sep/>
            <SmallInput
              ref="limit"
              hintText={this.props.modeLimit ? "limit" : "bitrate"}
              disabled={this.props.modeCRF}
              onFocus={this.props.makeFocuser("limit")}
              onBlur={this.props.onUpdate}
            />
            <Sep/>
            <SmallInput
              ref="quality"
              hintText="quality"
              onFocus={this.props.makeFocuser("quality")}
              onBlur={this.props.onUpdate}
            />
          </Prop>
          <Prop name="audio codec">
            <SmallSelect
              width={75}
              value={this.props.acodec}
              disabled={!this.props.hasAudio}
              onChange={this.props.makeSelecter("acodec")}
            >
              <MenuItem primaryText="opus" value="opus" />
              <MenuItem primaryText="vorbis" value="vorbis" />
            </SmallSelect>
            <Sep/>
            <SmallInput
              ref="ab"
              hintText={this.props.acodec === "opus" ? "bitrate" : "quality"}
              disabled={!this.props.hasAudio}
              onFocus={this.props.makeFocuser("ab")}
              onBlur={this.props.onUpdate}
            />
          </Prop>
          <Prop name="mode" valueClassName={classes.valueCheck}>
            <InlineCheckbox
              label="2pass"
              title="Use 2pass encode (recommended)"
              checked={this.props.mode2Pass}
              onCheck={this.props.makeChecker("mode2Pass")}
            />
            <Sep/>
            <InlineCheckbox
              label="limit"
              title="Toggle fit-to-limit and custom-bitrate modes"
              checked={this.props.modeLimit}
              disabled={this.props.modeCRF}
              onCheck={this.props.makeChecker("modeLimit")}
            />
            <Sep/>
            <InlineCheckbox
              label="crf"
              title="Use CRF mode (recommended for short clips)"
              checked={this.props.modeCRF}
              onCheck={this.props.makeChecker("modeCRF")}
            />
          </Prop>
        </HelpPane>
        <Prop name="raw args" nameClassName={classes.nameArgs}>
          <ArgsInput
            ref="rawArgs"
            onChange={this.props.onRawArgs}
          />
        </Prop>
      </div>
    );
  }
}