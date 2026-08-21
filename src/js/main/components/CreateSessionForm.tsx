import { useLocalStorage } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import {
  Paper,
  TextInput,
  Select,
  Button,
  Stack,
  Title,
  Text,
  Group
} from "@mantine/core";
import { IconFolderPlus } from "@tabler/icons-react";

import { fs, path } from "../../lib/cep/node";
import { evalTS } from "../../lib/utils/bolt";

const SESX_TEMPLATE = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<!DOCTYPE sesx>
<sesx version="1.9">

  <session appBuild="25.0.0.47" appVersion="25.0" audioChannelType="stereo" bitDepth="32" duration="1440000" sampleRate="48000">
    <tracks>
      <audioTrack automationLaneOpenState="false" id="10001" index="1" select="true" visible="true">
        <trackParameters trackHeight="134" trackHue="160" trackMinimized="false">
          <name>轨道 1</name>
        </trackParameters>
        <trackAudioParameters audioChannelType="stereo" automationMode="1" monitoring="false" recordArmed="false" solo="false" soloSafe="false">
          <trackOutput outputID="10000" type="trackID"/>
          <trackInput inputID="1"/>
          <component componentGuid="f6aa250f-971c-4c17-89ed-45b3affca963" componentID="Audition.Fader" id="trackFader" name="volume" powered="true">
            <parameter index="0" name="volume" parameterValue="1"/>
            <parameter index="1" name="static gain" parameterValue="1"/>
          </component>
          <component componentGuid="20bb3544-f1a6-43f1-afb3-f7343125fd7e" componentID="Audition.Mute" id="trackMute" name="Mute" powered="true">
            <parameter index="0" parameterValue="0"/>
            <parameter index="1" name="mute" parameterValue="0"/>
          </component>
          <component componentGuid="dae0b24e-896a-4c61-b428-2b70bc1e7f97" componentID="Audition.StereoPanner" id="trackPan" name="StereoPanner" powered="true">
            <parameter index="0" name="声像" parameterValue="0"/>
          </component>
          <component componentGuid="9d67be71-189d-4782-b924-55f8c5001c32" componentID="Audition.EQ" id="trackEQ" name="EQ" powered="false">
            <parameter index="0" name="下限频率" parameterValue="0.000834028352983295917510986328125"/>
            <parameter index="1" name="下限增益" parameterValue="0.5"/>
            <parameter index="2" name="上限频率" parameterValue="0.74979150295257568359375"/>
            <parameter index="3" name="上限频率增益" parameterValue="0.5"/>
            <parameter index="4" name="EQ 频段 1 中置频率" parameterValue="0.00125104258768260478973388671875"/>
            <parameter index="5" name="EQ 频段 1 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="6" name="EQ 频段 1 增益" parameterValue="0.5"/>
            <parameter index="7" name="EQ 频段 1 启用" parameterValue="1"/>
            <parameter index="8" name="EQ 频段 2 中置频率" parameterValue="0.0075062550604343414306640625"/>
            <parameter index="9" name="EQ 频段 2 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="10" name="EQ 频段 2 增益" parameterValue="0.5"/>
            <parameter index="11" name="EQ 频段 2 启用" parameterValue="1"/>
            <parameter index="12" name="EQ 频段 3 中置频率" parameterValue="0.0325271077454090118408203125"/>
            <parameter index="13" name="EQ 频段 3 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="14" name="EQ 频段 3 增益" parameterValue="0.5"/>
            <parameter index="15" name="EQ 频段 3 启用" parameterValue="1"/>
            <parameter index="16" name="EQ 频段 4 中置频率" parameterValue="0.13261051476001739501953125"/>
            <parameter index="17" name="EQ 频段 4 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="18" name="EQ 频段 4 增益" parameterValue="0.5"/>
            <parameter index="19" name="EQ 频段 4 启用" parameterValue="1"/>
            <parameter index="20" name="EQ 频段 5 中置频率" parameterValue="0.532944142818450927734375"/>
            <parameter index="21" name="EQ 频段 5 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="22" name="EQ 频段 5 增益" parameterValue="0.5"/>
            <parameter index="23" name="EQ 频段 5 启用" parameterValue="1"/>
            <parameter index="24" name="增益" parameterValue="0.666666686534881591796875"/>
            <parameter index="25" name="恒定 Q" parameterValue="1"/>
            <parameter index="26" name="下限滤镜顺序" parameterValue="0"/>
            <parameter index="27" name="上限频率滤镜顺序" parameterValue="0"/>
            <parameter index="28" name="超静音模式" parameterValue="0"/>
            <parameter index="29" name="下限启用" parameterValue="1"/>
            <parameter index="30" name="上限频率启用" parameterValue="1"/>
            <parameter index="31" name="原始采样率" parameterValue="0.25"/>
            <parameter index="32" name="EQ 频段 1 频带宽" parameterValue="0.002499990165233612060546875"/>
            <parameter index="33" name="EQ 频段 2 频段宽度" parameterValue="0.0099999904632568359375"/>
            <parameter index="34" name="EQ 频段 3 频段宽度" parameterValue="0.0399999916553497314453125"/>
            <parameter index="35" name="EQ 频段 4 频段宽度" parameterValue="0.15999998152256011962890625"/>
            <parameter index="36" name="EQ 频段 5 频段宽度" parameterValue="0.63999998569488525390625"/>
            <parameter index="37" name="高通滤波启用" parameterValue="0"/>
            <parameter index="38" name="高通切除频率" parameterValue="0"/>
            <parameter index="39" name="高通斜率" parameterValue="0.4000000059604644775390625"/>
            <parameter index="40" name="低通滤波启用" parameterValue="0"/>
            <parameter index="41" name="低通切除频率" parameterValue="0.833194315433502197265625"/>
            <parameter index="42" name="低通斜率" parameterValue="0.4000000059604644775390625"/>
            <parameter index="43" name="不使用" parameterValue="0"/>
            <parameter index="44" name="下限图示范围" parameterValue="1"/>
          </component>
        </trackAudioParameters>
        <editParameter parameterIndex="0" slotIndex="4294967280"/>
      </audioTrack>
      <audioTrack automationLaneOpenState="false" id="10002" index="2" select="false" visible="true">
        <trackParameters trackHeight="134" trackHue="267" trackMinimized="false">
          <name>轨道 2</name>
        </trackParameters>
        <trackAudioParameters audioChannelType="stereo" automationMode="1" monitoring="false" recordArmed="false" solo="false" soloSafe="false">
          <trackOutput outputID="10000" type="trackID"/>
          <trackInput inputID="1"/>
          <component componentGuid="43bca55f-3b0e-4fdd-be4f-969931ebb67d" componentID="Audition.Fader" id="trackFader" name="volume" powered="true">
            <parameter index="0" name="volume" parameterValue="1"/>
            <parameter index="1" name="static gain" parameterValue="1"/>
          </component>
          <component componentGuid="3b549554-1137-4f23-9fa0-d2f85e0f472a" componentID="Audition.Mute" id="trackMute" name="Mute" powered="true">
            <parameter index="0" parameterValue="0"/>
            <parameter index="1" name="mute" parameterValue="0"/>
          </component>
          <component componentGuid="d5bc3caf-70e1-4d60-9d25-36af1c57cef8" componentID="Audition.StereoPanner" id="trackPan" name="StereoPanner" powered="true">
            <parameter index="0" name="声像" parameterValue="0"/>
          </component>
          <component componentGuid="f7de4c00-0ebc-4fd6-887d-0ce9b2fcc025" componentID="Audition.EQ" id="trackEQ" name="EQ" powered="false">
            <parameter index="0" name="下限频率" parameterValue="0.000834028352983295917510986328125"/>
            <parameter index="1" name="下限增益" parameterValue="0.5"/>
            <parameter index="2" name="上限频率" parameterValue="0.74979150295257568359375"/>
            <parameter index="3" name="上限频率增益" parameterValue="0.5"/>
            <parameter index="4" name="EQ 频段 1 中置频率" parameterValue="0.00125104258768260478973388671875"/>
            <parameter index="5" name="EQ 频段 1 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="6" name="EQ 频段 1 增益" parameterValue="0.5"/>
            <parameter index="7" name="EQ 频段 1 启用" parameterValue="1"/>
            <parameter index="8" name="EQ 频段 2 中置频率" parameterValue="0.0075062550604343414306640625"/>
            <parameter index="9" name="EQ 频段 2 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="10" name="EQ 频段 2 增益" parameterValue="0.5"/>
            <parameter index="11" name="EQ 频段 2 启用" parameterValue="1"/>
            <parameter index="12" name="EQ 频段 3 中置频率" parameterValue="0.0325271077454090118408203125"/>
            <parameter index="13" name="EQ 频段 3 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="14" name="EQ 频段 3 增益" parameterValue="0.5"/>
            <parameter index="15" name="EQ 频段 3 启用" parameterValue="1"/>
            <parameter index="16" name="EQ 频段 4 中置频率" parameterValue="0.13261051476001739501953125"/>
            <parameter index="17" name="EQ 频段 4 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="18" name="EQ 频段 4 增益" parameterValue="0.5"/>
            <parameter index="19" name="EQ 频段 4 启用" parameterValue="1"/>
            <parameter index="20" name="EQ 频段 5 中置频率" parameterValue="0.532944142818450927734375"/>
            <parameter index="21" name="EQ 频段 5 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="22" name="EQ 频段 5 增益" parameterValue="0.5"/>
            <parameter index="23" name="EQ 频段 5 启用" parameterValue="1"/>
            <parameter index="24" name="增益" parameterValue="0.666666686534881591796875"/>
            <parameter index="25" name="恒定 Q" parameterValue="1"/>
            <parameter index="26" name="下限滤镜顺序" parameterValue="0"/>
            <parameter index="27" name="上限频率滤镜顺序" parameterValue="0"/>
            <parameter index="28" name="超静音模式" parameterValue="0"/>
            <parameter index="29" name="下限启用" parameterValue="1"/>
            <parameter index="30" name="上限频率启用" parameterValue="1"/>
            <parameter index="31" name="原始采样率" parameterValue="0.25"/>
            <parameter index="32" name="EQ 频段 1 频带宽" parameterValue="0.002499990165233612060546875"/>
            <parameter index="33" name="EQ 频段 2 频段宽度" parameterValue="0.0099999904632568359375"/>
            <parameter index="34" name="EQ 频段 3 频段宽度" parameterValue="0.0399999916553497314453125"/>
            <parameter index="35" name="EQ 频段 4 频段宽度" parameterValue="0.15999998152256011962890625"/>
            <parameter index="36" name="EQ 频段 5 频段宽度" parameterValue="0.63999998569488525390625"/>
            <parameter index="37" name="高通滤波启用" parameterValue="0"/>
            <parameter index="38" name="高通切除频率" parameterValue="0"/>
            <parameter index="39" name="高通斜率" parameterValue="0.4000000059604644775390625"/>
            <parameter index="40" name="低通滤波启用" parameterValue="0"/>
            <parameter index="41" name="低通切除频率" parameterValue="0.833194315433502197265625"/>
            <parameter index="42" name="低通斜率" parameterValue="0.4000000059604644775390625"/>
            <parameter index="43" name="不使用" parameterValue="0"/>
            <parameter index="44" name="下限图示范围" parameterValue="1"/>
          </component>
        </trackAudioParameters>
        <editParameter parameterIndex="0" slotIndex="4294967280"/>
      </audioTrack>
      <audioTrack automationLaneOpenState="false" id="10003" index="3" select="false" visible="true">
        <trackParameters trackHeight="134" trackHue="51" trackMinimized="false">
          <name>轨道 3</name>
        </trackParameters>
        <trackAudioParameters audioChannelType="stereo" automationMode="1" monitoring="false" recordArmed="false" solo="false" soloSafe="false">
          <trackOutput outputID="10000" type="trackID"/>
          <trackInput inputID="1"/>
          <component componentGuid="88320fe7-a071-400f-a1f0-f8982aa07715" componentID="Audition.Fader" id="trackFader" name="volume" powered="true">
            <parameter index="0" name="volume" parameterValue="1"/>
            <parameter index="1" name="static gain" parameterValue="1"/>
          </component>
          <component componentGuid="89d949d2-fce3-4fbe-b286-a376be66869f" componentID="Audition.Mute" id="trackMute" name="Mute" powered="true">
            <parameter index="0" parameterValue="0"/>
            <parameter index="1" name="mute" parameterValue="0"/>
          </component>
          <component componentGuid="7a63cc3c-a9f7-4a7f-9da3-a205ba1db15a" componentID="Audition.StereoPanner" id="trackPan" name="StereoPanner" powered="true">
            <parameter index="0" name="声像" parameterValue="0"/>
          </component>
          <component componentGuid="ab7abcf2-7212-4fe2-a36c-4bf28df5c6d8" componentID="Audition.EQ" id="trackEQ" name="EQ" powered="false">
            <parameter index="0" name="下限频率" parameterValue="0.000834028352983295917510986328125"/>
            <parameter index="1" name="下限增益" parameterValue="0.5"/>
            <parameter index="2" name="上限频率" parameterValue="0.74979150295257568359375"/>
            <parameter index="3" name="上限频率增益" parameterValue="0.5"/>
            <parameter index="4" name="EQ 频段 1 中置频率" parameterValue="0.00125104258768260478973388671875"/>
            <parameter index="5" name="EQ 频段 1 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="6" name="EQ 频段 1 增益" parameterValue="0.5"/>
            <parameter index="7" name="EQ 频段 1 启用" parameterValue="1"/>
            <parameter index="8" name="EQ 频段 2 中置频率" parameterValue="0.0075062550604343414306640625"/>
            <parameter index="9" name="EQ 频段 2 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="10" name="EQ 频段 2 增益" parameterValue="0.5"/>
            <parameter index="11" name="EQ 频段 2 启用" parameterValue="1"/>
            <parameter index="12" name="EQ 频段 3 中置频率" parameterValue="0.0325271077454090118408203125"/>
            <parameter index="13" name="EQ 频段 3 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="14" name="EQ 频段 3 增益" parameterValue="0.5"/>
            <parameter index="15" name="EQ 频段 3 启用" parameterValue="1"/>
            <parameter index="16" name="EQ 频段 4 中置频率" parameterValue="0.13261051476001739501953125"/>
            <parameter index="17" name="EQ 频段 4 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="18" name="EQ 频段 4 增益" parameterValue="0.5"/>
            <parameter index="19" name="EQ 频段 4 启用" parameterValue="1"/>
            <parameter index="20" name="EQ 频段 5 中置频率" parameterValue="0.532944142818450927734375"/>
            <parameter index="21" name="EQ 频段 5 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="22" name="EQ 频段 5 增益" parameterValue="0.5"/>
            <parameter index="23" name="EQ 频段 5 启用" parameterValue="1"/>
            <parameter index="24" name="增益" parameterValue="0.666666686534881591796875"/>
            <parameter index="25" name="恒定 Q" parameterValue="1"/>
            <parameter index="26" name="下限滤镜顺序" parameterValue="0"/>
            <parameter index="27" name="上限频率滤镜顺序" parameterValue="0"/>
            <parameter index="28" name="超静音模式" parameterValue="0"/>
            <parameter index="29" name="下限启用" parameterValue="1"/>
            <parameter index="30" name="上限频率启用" parameterValue="1"/>
            <parameter index="31" name="原始采样率" parameterValue="0.25"/>
            <parameter index="32" name="EQ 频段 1 频带宽" parameterValue="0.002499990165233612060546875"/>
            <parameter index="33" name="EQ 频段 2 频段宽度" parameterValue="0.0099999904632568359375"/>
            <parameter index="34" name="EQ 频段 3 频段宽度" parameterValue="0.0399999916553497314453125"/>
            <parameter index="35" name="EQ 频段 4 频段宽度" parameterValue="0.15999998152256011962890625"/>
            <parameter index="36" name="EQ 频段 5 频段宽度" parameterValue="0.63999998569488525390625"/>
            <parameter index="37" name="高通滤波启用" parameterValue="0"/>
            <parameter index="38" name="高通切除频率" parameterValue="0"/>
            <parameter index="39" name="高通斜率" parameterValue="0.4000000059604644775390625"/>
            <parameter index="40" name="低通滤波启用" parameterValue="0"/>
            <parameter index="41" name="低通切除频率" parameterValue="0.833194315433502197265625"/>
            <parameter index="42" name="低通斜率" parameterValue="0.4000000059604644775390625"/>
            <parameter index="43" name="不使用" parameterValue="0"/>
            <parameter index="44" name="下限图示范围" parameterValue="1"/>
          </component>
        </trackAudioParameters>
        <editParameter parameterIndex="0" slotIndex="4294967280"/>
      </audioTrack>
      <audioTrack automationLaneOpenState="false" id="10004" index="4" select="false" visible="true">
        <trackParameters trackHeight="134" trackHue="182" trackMinimized="false">
          <name>轨道 4</name>
        </trackParameters>
        <trackAudioParameters audioChannelType="stereo" automationMode="1" monitoring="false" recordArmed="false" solo="false" soloSafe="false">
          <trackOutput outputID="10000" type="trackID"/>
          <trackInput inputID="1"/>
          <component componentGuid="bcd9951a-0902-46cc-9376-ecb5c657af5a" componentID="Audition.Fader" id="trackFader" name="volume" powered="true">
            <parameter index="0" name="volume" parameterValue="1"/>
            <parameter index="1" name="static gain" parameterValue="1"/>
          </component>
          <component componentGuid="089a1970-bf03-44f0-8164-5d3e8a4f8c9f" componentID="Audition.Mute" id="trackMute" name="Mute" powered="true">
            <parameter index="0" parameterValue="0"/>
            <parameter index="1" name="mute" parameterValue="0"/>
          </component>
          <component componentGuid="211a7f82-b4bc-44ff-89ef-02eb0a44abc5" componentID="Audition.StereoPanner" id="trackPan" name="StereoPanner" powered="true">
            <parameter index="0" name="声像" parameterValue="0"/>
          </component>
          <component componentGuid="90a6cc73-2a78-43c6-a33b-fe5b9844ebe3" componentID="Audition.EQ" id="trackEQ" name="EQ" powered="false">
            <parameter index="0" name="下限频率" parameterValue="0.000834028352983295917510986328125"/>
            <parameter index="1" name="下限增益" parameterValue="0.5"/>
            <parameter index="2" name="上限频率" parameterValue="0.74979150295257568359375"/>
            <parameter index="3" name="上限频率增益" parameterValue="0.5"/>
            <parameter index="4" name="EQ 频段 1 中置频率" parameterValue="0.00125104258768260478973388671875"/>
            <parameter index="5" name="EQ 频段 1 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="6" name="EQ 频段 1 增益" parameterValue="0.5"/>
            <parameter index="7" name="EQ 频段 1 启用" parameterValue="1"/>
            <parameter index="8" name="EQ 频段 2 中置频率" parameterValue="0.0075062550604343414306640625"/>
            <parameter index="9" name="EQ 频段 2 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="10" name="EQ 频段 2 增益" parameterValue="0.5"/>
            <parameter index="11" name="EQ 频段 2 启用" parameterValue="1"/>
            <parameter index="12" name="EQ 频段 3 中置频率" parameterValue="0.0325271077454090118408203125"/>
            <parameter index="13" name="EQ 频段 3 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="14" name="EQ 频段 3 增益" parameterValue="0.5"/>
            <parameter index="15" name="EQ 频段 3 启用" parameterValue="1"/>
            <parameter index="16" name="EQ 频段 4 中置频率" parameterValue="0.13261051476001739501953125"/>
            <parameter index="17" name="EQ 频段 4 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="18" name="EQ 频段 4 增益" parameterValue="0.5"/>
            <parameter index="19" name="EQ 频段 4 启用" parameterValue="1"/>
            <parameter index="20" name="EQ 频段 5 中置频率" parameterValue="0.532944142818450927734375"/>
            <parameter index="21" name="EQ 频段 5 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="22" name="EQ 频段 5 增益" parameterValue="0.5"/>
            <parameter index="23" name="EQ 频段 5 启用" parameterValue="1"/>
            <parameter index="24" name="增益" parameterValue="0.666666686534881591796875"/>
            <parameter index="25" name="恒定 Q" parameterValue="1"/>
            <parameter index="26" name="下限滤镜顺序" parameterValue="0"/>
            <parameter index="27" name="上限频率滤镜顺序" parameterValue="0"/>
            <parameter index="28" name="超静音模式" parameterValue="0"/>
            <parameter index="29" name="下限启用" parameterValue="1"/>
            <parameter index="30" name="上限频率启用" parameterValue="1"/>
            <parameter index="31" name="原始采样率" parameterValue="0.25"/>
            <parameter index="32" name="EQ 频段 1 频带宽" parameterValue="0.002499990165233612060546875"/>
            <parameter index="33" name="EQ 频段 2 频段宽度" parameterValue="0.0099999904632568359375"/>
            <parameter index="34" name="EQ 频段 3 频段宽度" parameterValue="0.0399999916553497314453125"/>
            <parameter index="35" name="EQ 频段 4 频段宽度" parameterValue="0.15999998152256011962890625"/>
            <parameter index="36" name="EQ 频段 5 频段宽度" parameterValue="0.63999998569488525390625"/>
            <parameter index="37" name="高通滤波启用" parameterValue="0"/>
            <parameter index="38" name="高通切除频率" parameterValue="0"/>
            <parameter index="39" name="高通斜率" parameterValue="0.4000000059604644775390625"/>
            <parameter index="40" name="低通滤波启用" parameterValue="0"/>
            <parameter index="41" name="低通切除频率" parameterValue="0.833194315433502197265625"/>
            <parameter index="42" name="低通斜率" parameterValue="0.4000000059604644775390625"/>
            <parameter index="43" name="不使用" parameterValue="0"/>
            <parameter index="44" name="下限图示范围" parameterValue="1"/>
          </component>
        </trackAudioParameters>
        <editParameter parameterIndex="0" slotIndex="4294967280"/>
      </audioTrack>
      <audioTrack automationLaneOpenState="false" id="10005" index="5" select="false" visible="true">
        <trackParameters trackHeight="134" trackHue="294" trackMinimized="false">
          <name>轨道 5</name>
        </trackParameters>
        <trackAudioParameters audioChannelType="stereo" automationMode="1" monitoring="false" recordArmed="false" solo="false" soloSafe="false">
          <trackOutput outputID="10000" type="trackID"/>
          <trackInput inputID="1"/>
          <component componentGuid="3d0fe553-9cb5-4646-834d-9b6f77304f44" componentID="Audition.Fader" id="trackFader" name="volume" powered="true">
            <parameter index="0" name="volume" parameterValue="1"/>
            <parameter index="1" name="static gain" parameterValue="1"/>
          </component>
          <component componentGuid="a6a6be6f-0530-470e-b19f-1987a31477f9" componentID="Audition.Mute" id="trackMute" name="Mute" powered="true">
            <parameter index="0" parameterValue="0"/>
            <parameter index="1" name="mute" parameterValue="0"/>
          </component>
          <component componentGuid="63c77d59-e2f4-46ca-b466-e91e2ef7cf64" componentID="Audition.StereoPanner" id="trackPan" name="StereoPanner" powered="true">
            <parameter index="0" name="声像" parameterValue="0"/>
          </component>
          <component componentGuid="714343c1-9a8f-4c63-a0a0-d5d276191ac2" componentID="Audition.EQ" id="trackEQ" name="EQ" powered="false">
            <parameter index="0" name="下限频率" parameterValue="0.000834028352983295917510986328125"/>
            <parameter index="1" name="下限增益" parameterValue="0.5"/>
            <parameter index="2" name="上限频率" parameterValue="0.74979150295257568359375"/>
            <parameter index="3" name="上限频率增益" parameterValue="0.5"/>
            <parameter index="4" name="EQ 频段 1 中置频率" parameterValue="0.00125104258768260478973388671875"/>
            <parameter index="5" name="EQ 频段 1 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="6" name="EQ 频段 1 增益" parameterValue="0.5"/>
            <parameter index="7" name="EQ 频段 1 启用" parameterValue="1"/>
            <parameter index="8" name="EQ 频段 2 中置频率" parameterValue="0.0075062550604343414306640625"/>
            <parameter index="9" name="EQ 频段 2 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="10" name="EQ 频段 2 增益" parameterValue="0.5"/>
            <parameter index="11" name="EQ 频段 2 启用" parameterValue="1"/>
            <parameter index="12" name="EQ 频段 3 中置频率" parameterValue="0.0325271077454090118408203125"/>
            <parameter index="13" name="EQ 频段 3 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="14" name="EQ 频段 3 增益" parameterValue="0.5"/>
            <parameter index="15" name="EQ 频段 3 启用" parameterValue="1"/>
            <parameter index="16" name="EQ 频段 4 中置频率" parameterValue="0.13261051476001739501953125"/>
            <parameter index="17" name="EQ 频段 4 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="18" name="EQ 频段 4 增益" parameterValue="0.5"/>
            <parameter index="19" name="EQ 频段 4 启用" parameterValue="1"/>
            <parameter index="20" name="EQ 频段 5 中置频率" parameterValue="0.532944142818450927734375"/>
            <parameter index="21" name="EQ 频段 5 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="22" name="EQ 频段 5 增益" parameterValue="0.5"/>
            <parameter index="23" name="EQ 频段 5 启用" parameterValue="1"/>
            <parameter index="24" name="增益" parameterValue="0.666666686534881591796875"/>
            <parameter index="25" name="恒定 Q" parameterValue="1"/>
            <parameter index="26" name="下限滤镜顺序" parameterValue="0"/>
            <parameter index="27" name="上限频率滤镜顺序" parameterValue="0"/>
            <parameter index="28" name="超静音模式" parameterValue="0"/>
            <parameter index="29" name="下限启用" parameterValue="1"/>
            <parameter index="30" name="上限频率启用" parameterValue="1"/>
            <parameter index="31" name="原始采样率" parameterValue="0.25"/>
            <parameter index="32" name="EQ 频段 1 频带宽" parameterValue="0.002499990165233612060546875"/>
            <parameter index="33" name="EQ 频段 2 频段宽度" parameterValue="0.0099999904632568359375"/>
            <parameter index="34" name="EQ 频段 3 频段宽度" parameterValue="0.0399999916553497314453125"/>
            <parameter index="35" name="EQ 频段 4 频段宽度" parameterValue="0.15999998152256011962890625"/>
            <parameter index="36" name="EQ 频段 5 频段宽度" parameterValue="0.63999998569488525390625"/>
            <parameter index="37" name="高通滤波启用" parameterValue="0"/>
            <parameter index="38" name="高通切除频率" parameterValue="0"/>
            <parameter index="39" name="高通斜率" parameterValue="0.4000000059604644775390625"/>
            <parameter index="40" name="低通滤波启用" parameterValue="0"/>
            <parameter index="41" name="低通切除频率" parameterValue="0.833194315433502197265625"/>
            <parameter index="42" name="低通斜率" parameterValue="0.4000000059604644775390625"/>
            <parameter index="43" name="不使用" parameterValue="0"/>
            <parameter index="44" name="下限图示范围" parameterValue="1"/>
          </component>
        </trackAudioParameters>
        <editParameter parameterIndex="0" slotIndex="4294967280"/>
      </audioTrack>
      <audioTrack automationLaneOpenState="false" id="10006" index="6" select="false" visible="true">
        <trackParameters trackHeight="134" trackHue="92" trackMinimized="false">
          <name>轨道 6</name>
        </trackParameters>
        <trackAudioParameters audioChannelType="stereo" automationMode="1" monitoring="false" recordArmed="false" solo="false" soloSafe="false">
          <trackOutput outputID="10000" type="trackID"/>
          <trackInput inputID="1"/>
          <component componentGuid="446b904d-4846-4e58-8609-22bdc00038cd" componentID="Audition.Fader" id="trackFader" name="volume" powered="true">
            <parameter index="0" name="volume" parameterValue="1"/>
            <parameter index="1" name="static gain" parameterValue="1"/>
          </component>
          <component componentGuid="2af9ada5-f785-4553-a265-ebdfb08bcfc4" componentID="Audition.Mute" id="trackMute" name="Mute" powered="true">
            <parameter index="0" parameterValue="0"/>
            <parameter index="1" name="mute" parameterValue="0"/>
          </component>
          <component componentGuid="5e496863-74e5-4425-9802-eeb94c6f54b6" componentID="Audition.StereoPanner" id="trackPan" name="StereoPanner" powered="true">
            <parameter index="0" name="声像" parameterValue="0"/>
          </component>
          <component componentGuid="47a25689-a6dc-4062-add2-6eeaefc9e727" componentID="Audition.EQ" id="trackEQ" name="EQ" powered="false">
            <parameter index="0" name="下限频率" parameterValue="0.000834028352983295917510986328125"/>
            <parameter index="1" name="下限增益" parameterValue="0.5"/>
            <parameter index="2" name="上限频率" parameterValue="0.74979150295257568359375"/>
            <parameter index="3" name="上限频率增益" parameterValue="0.5"/>
            <parameter index="4" name="EQ 频段 1 中置频率" parameterValue="0.00125104258768260478973388671875"/>
            <parameter index="5" name="EQ 频段 1 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="6" name="EQ 频段 1 增益" parameterValue="0.5"/>
            <parameter index="7" name="EQ 频段 1 启用" parameterValue="1"/>
            <parameter index="8" name="EQ 频段 2 中置频率" parameterValue="0.0075062550604343414306640625"/>
            <parameter index="9" name="EQ 频段 2 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="10" name="EQ 频段 2 增益" parameterValue="0.5"/>
            <parameter index="11" name="EQ 频段 2 启用" parameterValue="1"/>
            <parameter index="12" name="EQ 频段 3 中置频率" parameterValue="0.0325271077454090118408203125"/>
            <parameter index="13" name="EQ 频段 3 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="14" name="EQ 频段 3 增益" parameterValue="0.5"/>
            <parameter index="15" name="EQ 频段 3 启用" parameterValue="1"/>
            <parameter index="16" name="EQ 频段 4 中置频率" parameterValue="0.13261051476001739501953125"/>
            <parameter index="17" name="EQ 频段 4 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="18" name="EQ 频段 4 增益" parameterValue="0.5"/>
            <parameter index="19" name="EQ 频段 4 启用" parameterValue="1"/>
            <parameter index="20" name="EQ 频段 5 中置频率" parameterValue="0.532944142818450927734375"/>
            <parameter index="21" name="EQ 频段 5 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="22" name="EQ 频段 5 增益" parameterValue="0.5"/>
            <parameter index="23" name="EQ 频段 5 启用" parameterValue="1"/>
            <parameter index="24" name="增益" parameterValue="0.666666686534881591796875"/>
            <parameter index="25" name="恒定 Q" parameterValue="1"/>
            <parameter index="26" name="下限滤镜顺序" parameterValue="0"/>
            <parameter index="27" name="上限频率滤镜顺序" parameterValue="0"/>
            <parameter index="28" name="超静音模式" parameterValue="0"/>
            <parameter index="29" name="下限启用" parameterValue="1"/>
            <parameter index="30" name="上限频率启用" parameterValue="1"/>
            <parameter index="31" name="原始采样率" parameterValue="0.25"/>
            <parameter index="32" name="EQ 频段 1 频带宽" parameterValue="0.002499990165233612060546875"/>
            <parameter index="33" name="EQ 频段 2 频段宽度" parameterValue="0.0099999904632568359375"/>
            <parameter index="34" name="EQ 频段 3 频段宽度" parameterValue="0.0399999916553497314453125"/>
            <parameter index="35" name="EQ 频段 4 频段宽度" parameterValue="0.15999998152256011962890625"/>
            <parameter index="36" name="EQ 频段 5 频段宽度" parameterValue="0.63999998569488525390625"/>
            <parameter index="37" name="高通滤波启用" parameterValue="0"/>
            <parameter index="38" name="高通切除频率" parameterValue="0"/>
            <parameter index="39" name="高通斜率" parameterValue="0.4000000059604644775390625"/>
            <parameter index="40" name="低通滤波启用" parameterValue="0"/>
            <parameter index="41" name="低通切除频率" parameterValue="0.833194315433502197265625"/>
            <parameter index="42" name="低通斜率" parameterValue="0.4000000059604644775390625"/>
            <parameter index="43" name="不使用" parameterValue="0"/>
            <parameter index="44" name="下限图示范围" parameterValue="1"/>
          </component>
        </trackAudioParameters>
        <editParameter parameterIndex="0" slotIndex="4294967280"/>
      </audioTrack>
      <masterTrack automationLaneOpenState="false" id="10000" index="7" select="false" visible="true">
        <trackParameters trackHeight="134" trackHue="-1" trackMinimized="false">
          <name>混合</name>
        </trackParameters>
        <trackAudioParameters audioChannelType="stereo" automationMode="1" monitoring="false" recordArmed="false" solo="false" soloSafe="true">
          <trackOutput outputID="1" type="hardwareOutput"/>
          <trackInput inputID="-1"/>
          <component componentGuid="28a679a3-39fa-4a67-8fca-f9da4a3d6229" componentID="Audition.Fader" id="trackFader" name="volume" powered="true">
            <parameter index="0" name="volume" parameterValue="1"/>
            <parameter index="1" name="static gain" parameterValue="1"/>
          </component>
          <component componentGuid="7dba7345-6f66-4e3e-ba76-542513b71fd7" componentID="Audition.Mute" id="trackMute" name="Mute" powered="true">
            <parameter index="0" parameterValue="0"/>
            <parameter index="1" name="mute" parameterValue="0"/>
          </component>
          <component componentGuid="fc990056-c22e-4ed9-af83-c42e2d90390d" componentID="Audition.StereoPanner" id="trackPan" name="StereoPanner" powered="true">
            <parameter index="0" name="声像" parameterValue="0"/>
          </component>
          <component componentGuid="684721bb-6589-4d28-a0c3-8e0da4909ddf" componentID="Audition.EQ" id="trackEQ" name="EQ" powered="false">
            <parameter index="0" name="下限频率" parameterValue="0.000834028352983295917510986328125"/>
            <parameter index="1" name="下限增益" parameterValue="0.5"/>
            <parameter index="2" name="上限频率" parameterValue="0.74979150295257568359375"/>
            <parameter index="3" name="上限频率增益" parameterValue="0.5"/>
            <parameter index="4" name="EQ 频段 1 中置频率" parameterValue="0.00125104258768260478973388671875"/>
            <parameter index="5" name="EQ 频段 1 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="6" name="EQ 频段 1 增益" parameterValue="0.5"/>
            <parameter index="7" name="EQ 频段 1 启用" parameterValue="1"/>
            <parameter index="8" name="EQ 频段 2 中置频率" parameterValue="0.0075062550604343414306640625"/>
            <parameter index="9" name="EQ 频段 2 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="10" name="EQ 频段 2 增益" parameterValue="0.5"/>
            <parameter index="11" name="EQ 频段 2 启用" parameterValue="1"/>
            <parameter index="12" name="EQ 频段 3 中置频率" parameterValue="0.0325271077454090118408203125"/>
            <parameter index="13" name="EQ 频段 3 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="14" name="EQ 频段 3 增益" parameterValue="0.5"/>
            <parameter index="15" name="EQ 频段 3 启用" parameterValue="1"/>
            <parameter index="16" name="EQ 频段 4 中置频率" parameterValue="0.13261051476001739501953125"/>
            <parameter index="17" name="EQ 频段 4 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="18" name="EQ 频段 4 增益" parameterValue="0.5"/>
            <parameter index="19" name="EQ 频段 4 启用" parameterValue="1"/>
            <parameter index="20" name="EQ 频段 5 中置频率" parameterValue="0.532944142818450927734375"/>
            <parameter index="21" name="EQ 频段 5 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="22" name="EQ 频段 5 增益" parameterValue="0.5"/>
            <parameter index="23" name="EQ 频段 5 启用" parameterValue="1"/>
            <parameter index="24" name="增益" parameterValue="0.666666686534881591796875"/>
            <parameter index="25" name="恒定 Q" parameterValue="1"/>
            <parameter index="26" name="下限滤镜顺序" parameterValue="0"/>
            <parameter index="27" name="上限频率滤镜顺序" parameterValue="0"/>
            <parameter index="28" name="超静音模式" parameterValue="0"/>
            <parameter index="29" name="下限启用" parameterValue="1"/>
            <parameter index="30" name="上限频率启用" parameterValue="1"/>
            <parameter index="31" name="原始采样率" parameterValue="0.25"/>
            <parameter index="32" name="EQ 频段 1 频带宽" parameterValue="0.002499990165233612060546875"/>
            <parameter index="33" name="EQ 频段 2 频段宽度" parameterValue="0.0099999904632568359375"/>
            <parameter index="34" name="EQ 频段 3 频段宽度" parameterValue="0.0399999916553497314453125"/>
            <parameter index="35" name="EQ 频段 4 频段宽度" parameterValue="0.15999998152256011962890625"/>
            <parameter index="36" name="EQ 频段 5 频段宽度" parameterValue="0.63999998569488525390625"/>
            <parameter index="37" name="高通滤波启用" parameterValue="0"/>
            <parameter index="38" name="高通切除频率" parameterValue="0"/>
            <parameter index="39" name="高通斜率" parameterValue="0.4000000059604644775390625"/>
            <parameter index="40" name="低通滤波启用" parameterValue="0"/>
            <parameter index="41" name="低通切除频率" parameterValue="0.833194315433502197265625"/>
            <parameter index="42" name="低通斜率" parameterValue="0.4000000059604644775390625"/>
            <parameter index="43" name="不使用" parameterValue="0"/>
            <parameter index="44" name="下限图示范围" parameterValue="1"/>
          </component>
        </trackAudioParameters>
        <editParameter parameterIndex="0" slotIndex="4294967280"/>
      </masterTrack>
    </tracks>
    <sessionState ctiPosition="0" smpteStart="0">
      <selectionState selectionDuration="0" selectionStart="0"/>
      <viewState horizontalViewDuration="1440000" horizontalViewStart="0" trackControlsWidth="224" verticalScrollOffset="0"/>
      <timeFormatState beatsPerBar="4" beatsPerMinute="120" customFrameRate="12" linkToDefaultTimeSettings="true" noteLength="4" subdivisions="16" timeCodeDropFrame="false" timeCodeFrameRate="30" timeCodeNTSC="false" timeFormat="timeFormatDecimal"/>
      <mixingOptionState defaultPanModeLogarithmic="false" panPower="-3" playOverlappingClips="false"/>
    </sessionState>
    <xmpMetadata><![CDATA[<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 9.0-c001 152.deb9585, 2024/02/06-08:36:10        ">
   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about=""
            xmlns:xmp="http://ns.adobe.com/xap/1.0/"
            xmlns:xmpMM="http://ns.adobe.com/xap/1.0/mm/"
            xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#"
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:xmpDM="http://ns.adobe.com/xmp/1.0/DynamicMedia/">
         <xmp:CreatorTool>Adobe Audition 25.0 (Windows)</xmp:CreatorTool>
         <xmp:CreateDate>2026-08-21T00:37:01+08:00</xmp:CreateDate>
         <xmp:MetadataDate>2026-08-21T00:37:03+08:00</xmp:MetadataDate>
         <xmp:ModifyDate>2026-08-21T00:37:03+08:00</xmp:ModifyDate>
         <xmpMM:InstanceID>xmp.iid:030bd0d4-fb4e-0747-a9a0-09293c0c05f9</xmpMM:InstanceID>
         <xmpMM:DocumentID>xmp.did:ab6a6f56-0c24-eb47-934b-ad2ada401f34</xmpMM:DocumentID>
         <xmpMM:OriginalDocumentID>xmp.did:ab6a6f56-0c24-eb47-934b-ad2ada401f34</xmpMM:OriginalDocumentID>
         <xmpMM:History>
            <rdf:Seq>
               <rdf:li rdf:parseType="Resource">
                  <stEvt:action>saved</stEvt:action>
                  <stEvt:instanceID>xmp.iid:ab6a6f56-0c24-eb47-934b-ad2ada401f34</stEvt:instanceID>
                  <stEvt:when>2026-08-21T00:37:01+08:00</stEvt:when>
                  <stEvt:softwareAgent>Adobe Audition 25.0 (Windows)</stEvt:softwareAgent>
                  <stEvt:changed>/metadata</stEvt:changed>
               </rdf:li>
               <rdf:li rdf:parseType="Resource">
                  <stEvt:action>saved</stEvt:action>
                  <stEvt:instanceID>xmp.iid:72e9d02c-094f-5847-ac7e-98f9c7b04160</stEvt:instanceID>
                  <stEvt:when>2026-08-21T00:37:03+08:00</stEvt:when>
                  <stEvt:softwareAgent>Adobe Audition 25.0 (Windows)</stEvt:softwareAgent>
                  <stEvt:changed>/metadata</stEvt:changed>
               </rdf:li>
               <rdf:li rdf:parseType="Resource">
                  <stEvt:action>saved</stEvt:action>
                  <stEvt:instanceID>xmp.iid:030bd0d4-fb4e-0747-a9a0-09293c0c05f9</stEvt:instanceID>
                  <stEvt:when>2026-08-21T00:37:03+08:00</stEvt:when>
                  <stEvt:softwareAgent>Adobe Audition 25.0 (Windows)</stEvt:softwareAgent>
                  <stEvt:changed>/</stEvt:changed>
               </rdf:li>
            </rdf:Seq>
         </xmpMM:History>
         <dc:format>application/xml</dc:format>
         <xmpDM:Tracks>
            <rdf:Bag>
               <rdf:li rdf:parseType="Resource">
                  <xmpDM:trackName>CuePoint Markers</xmpDM:trackName>
                  <xmpDM:trackType>Cue</xmpDM:trackType>
                  <xmpDM:frameRate>f48000</xmpDM:frameRate>
               </rdf:li>
               <rdf:li rdf:parseType="Resource">
                  <xmpDM:trackName>CD Track Markers</xmpDM:trackName>
                  <xmpDM:trackType>Track</xmpDM:trackType>
                  <xmpDM:frameRate>f48000</xmpDM:frameRate>
               </rdf:li>
               <rdf:li rdf:parseType="Resource">
                  <xmpDM:trackName>Subclip Markers</xmpDM:trackName>
                  <xmpDM:trackType>InOut</xmpDM:trackType>
                  <xmpDM:frameRate>f48000</xmpDM:frameRate>
               </rdf:li>
            </rdf:Bag>
         </xmpDM:Tracks>
      </rdf:Description>
   </rdf:RDF>
</x:xmpmeta>
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                           
<?xpacket end="w"?>]]></xmpMetadata>
    <clipGroups/>
    <metronome enabled="false" pattern="downBeat subdivision subdivision subdivision " soundSet="sticks">
      <metronomeTrack automationLaneOpenState="false" id="40000" index="0" select="false" visible="false">
        <trackParameters trackHeight="77" trackHue="-1" trackMinimized="false">
          <name>节拍器</name>
        </trackParameters>
        <trackAudioParameters audioChannelType="mono" automationMode="1" monitoring="false" recordArmed="false" solo="false" soloSafe="true">
          <trackOutput outputID="10000" type="trackID"/>
          <trackInput inputID="-1"/>
          <component componentGuid="105f8197-4e5a-41c9-969a-c30b4fffad68" componentID="Audition.Fader" id="trackFader" name="volume" powered="true">
            <parameter index="0" name="volume" parameterValue="0.50118720531463623046875"/>
            <parameter index="1" name="static gain" parameterValue="1"/>
          </component>
          <component componentGuid="60029f67-76ea-4e49-828a-3c4b866c4db9" componentID="Audition.Mute" id="trackMute" name="Mute" powered="true">
            <parameter index="0" parameterValue="0"/>
            <parameter index="1" name="mute" parameterValue="0"/>
          </component>
          <component componentGuid="c1403e82-560c-4f6a-a7ed-b3642b06fe60" componentID="Audition.StereoPanner" id="trackPan" name="StereoPanner" powered="true">
            <parameter index="0" name="声像" parameterValue="0"/>
          </component>
          <component componentGuid="11d7b410-bc28-4c1b-a623-4fe5900b8db9" componentID="Audition.EQ" id="trackEQ" name="EQ" powered="false">
            <parameter index="0" name="下限频率" parameterValue="0.000834028352983295917510986328125"/>
            <parameter index="1" name="下限增益" parameterValue="0.5"/>
            <parameter index="2" name="上限频率" parameterValue="0.74979150295257568359375"/>
            <parameter index="3" name="上限频率增益" parameterValue="0.5"/>
            <parameter index="4" name="EQ 频段 1 中置频率" parameterValue="0.00125104258768260478973388671875"/>
            <parameter index="5" name="EQ 频段 1 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="6" name="EQ 频段 1 增益" parameterValue="0.5"/>
            <parameter index="7" name="EQ 频段 1 启用" parameterValue="1"/>
            <parameter index="8" name="EQ 频段 2 中置频率" parameterValue="0.0075062550604343414306640625"/>
            <parameter index="9" name="EQ 频段 2 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="10" name="EQ 频段 2 增益" parameterValue="0.5"/>
            <parameter index="11" name="EQ 频段 2 启用" parameterValue="1"/>
            <parameter index="12" name="EQ 频段 3 中置频率" parameterValue="0.0325271077454090118408203125"/>
            <parameter index="13" name="EQ 频段 3 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="14" name="EQ 频段 3 增益" parameterValue="0.5"/>
            <parameter index="15" name="EQ 频段 3 启用" parameterValue="1"/>
            <parameter index="16" name="EQ 频段 4 中置频率" parameterValue="0.13261051476001739501953125"/>
            <parameter index="17" name="EQ 频段 4 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="18" name="EQ 频段 4 增益" parameterValue="0.5"/>
            <parameter index="19" name="EQ 频段 4 启用" parameterValue="1"/>
            <parameter index="20" name="EQ 频段 5 中置频率" parameterValue="0.532944142818450927734375"/>
            <parameter index="21" name="EQ 频段 5 Q" parameterValue="0.000199989997781813144683837890625"/>
            <parameter index="22" name="EQ 频段 5 增益" parameterValue="0.5"/>
            <parameter index="23" name="EQ 频段 5 启用" parameterValue="1"/>
            <parameter index="24" name="增益" parameterValue="0.666666686534881591796875"/>
            <parameter index="25" name="恒定 Q" parameterValue="1"/>
            <parameter index="26" name="下限滤镜顺序" parameterValue="0"/>
            <parameter index="27" name="上限频率滤镜顺序" parameterValue="0"/>
            <parameter index="28" name="超静音模式" parameterValue="0"/>
            <parameter index="29" name="下限启用" parameterValue="1"/>
            <parameter index="30" name="上限频率启用" parameterValue="1"/>
            <parameter index="31" name="原始采样率" parameterValue="0.25"/>
            <parameter index="32" name="EQ 频段 1 频带宽" parameterValue="0.002499990165233612060546875"/>
            <parameter index="33" name="EQ 频段 2 频段宽度" parameterValue="0.0099999904632568359375"/>
            <parameter index="34" name="EQ 频段 3 频段宽度" parameterValue="0.0399999916553497314453125"/>
            <parameter index="35" name="EQ 频段 4 频段宽度" parameterValue="0.15999998152256011962890625"/>
            <parameter index="36" name="EQ 频段 5 频段宽度" parameterValue="0.63999998569488525390625"/>
            <parameter index="37" name="高通滤波启用" parameterValue="0"/>
            <parameter index="38" name="高通切除频率" parameterValue="0"/>
            <parameter index="39" name="高通斜率" parameterValue="0.4000000059604644775390625"/>
            <parameter index="40" name="低通滤波启用" parameterValue="0"/>
            <parameter index="41" name="低通切除频率" parameterValue="0.833194315433502197265625"/>
            <parameter index="42" name="低通斜率" parameterValue="0.4000000059604644775390625"/>
            <parameter index="43" name="不使用" parameterValue="0"/>
            <parameter index="44" name="下限图示范围" parameterValue="1"/>
          </component>
        </trackAudioParameters>
        <editParameter parameterIndex="0" slotIndex="4294967280"/>
      </metronomeTrack>
    </metronome>
    <properties>
      <property key="EssentialSoundConfigurations">[{"Guid":"a8b40e3e-13e7-4c1f-b382-96058f1f691d","Name":"$$$/app/Presets/DefaultPresetName=(Default)","PresetData":{"ModeID":"ambience","Models":{"model_ducking":{},"model_loudness":{"DefaultLoudness":{"type":"float","value":-30},"LoudnessStandard":{"type":"std::uint32_t","value":0},"MaxLoudness":{"type":"float","value":-12},"MinLoudness":{"type":"float","value":-42}},"model_soundeffects":{"ReverbPresets":{"type":"tree::any","value":{"$$$/app/Presets/EssentialSound/ReverbPreset/LargeRoomAmbience=Large Room Ambience":{"type":"array::float","value":[0.05150749906897545,0.32432401180267334,0.2929289937019348,0.30000001192092896,0.20000000298023224,0,0.14285700023174286,0.4000000059604645,0.5,0.699999988079071,0.30000001192092896,0.2512562870979309,0.03125]},"$$$/app/Presets/EssentialSound/ReverbPreset/OutsideAmbience=Outside Ambience":{"type":"array::float","value":[0.09170850366353989,0.04389389976859093,1,0.5,0.20000000298023224,0.800000011920929,0.18367299437522888,1,0.5,0,0.800000011920929,0.2512562870979309,0.03125]},"$$$/app/Presets/EssentialSound/ReverbPreset/RoomAmbience=Room Ambience":{"type":"array::float","value":[0.0577889010310173,0.44944900274276733,0.49494898319244385,0.8999999761581421,0.10000000149011612,0.15000000596046448,0.08163270354270935,0.4000000059604645,0.5,0.800000011920929,0.20000000298023224,0.2512562870979309,0.03125]},"$$$/app/Presets/EssentialSound/ReverbPreset/WindEffect=Wind Effect":{"type":"array::float","value":[0.1959799975156784,0.6896899938583374,0.6969699859619141,0.25,0.5,0.5,0.2346940040588379,0.5199999809265137,0.5,0.75,0.25,0.2512562870979309,0.03125]}}}},"model_stereowidth":{},"model_volume":{"MaxGain":{"type":"float","value":15},"MinGain":{"type":"float","value":-60}}},"Version":1},"Type":"1c19ca71-c24c-49cd-8dd5-2cc46018507a","Version":1},{"Guid":"58dc27a8-6a2a-480c-bd0c-4b45fff346a6","Name":"$$$/app/Presets/DefaultPresetName=(Default)","PresetData":{"ModeID":"dialog","Models":{"model_clarity":{"EQPresets":{"type":"tree::any","value":{"$$$/app/Presets/EssentialSound/EQPreset/BackgroundVoice=Background Voice":{"type":"array::float","value":[0.12099699676036835,0.5,0.39240506291389465,0,0.5,0.5,0.5,0.5,0.5,0.47827938199043274,0.4577268958091736,0.45778733491897583,0.47946760058403015,0.5,0]},"$$$/app/Presets/EssentialSound/EQPreset/Intercom=Intercom":{"type":"array::float","value":[0.19432899355888367,0.5,1,0,0.07149998843669891,0.07149998843669891,0.07149998843669891,0.40238627791404724,0.48571401834487915,0.5,0.5515574812889099,0.5960257649421692,0.22246670722961426,0.07149998843669891,0]},"$$$/app/Presets/EssentialSound/EQPreset/LockedInTheTrunk=Locked in the Trunk":{"type":"array::float","value":[0.12099699676036835,0.5,0.797468364238739,0,0.5,0.5,0.5,0.5,0.5,0.32846158742904663,0.15721426904201508,0.15721426904201508,0.15721426904201508,0.15721426904201508,0]},"$$$/app/Presets/EssentialSound/EQPreset/OldRadio=Old Radio":{"type":"array::float","value":[0.12099699676036835,0.5,0.797468364238739,0,0.15721426904201508,0.15721426904201508,0.15721426904201508,0.2844204008579254,0.48315632343292236,0.364984929561615,0.5285388827323914,0.4351150095462799,0.2715468406677246,0.15721426904201508,0]},"$$$/app/Presets/EssentialSound/EQPreset/OnTheTelephone=On the Telephone":{"type":"array::float","value":[0.12099699676036835,0.5,0.39240506291389465,0,0.328642874956131,0.328642874956131,0.328642874956131,0.328642874956131,0.48571401834487915,0.5307139754295349,0.5307139754295349,0.48357096314430237,0.328642874956131,0.328642874956131,0]},"$$$/app/Presets/EssentialSound/EQPreset/OutsideOfTheRoom=Outside of the Room":{"type":"array::float","value":[0.12099699676036835,0.5,0.797468364238739,0,0.4253937005996704,0.47865453362464905,0.5,0.5,0.48571401834487915,0.40073278546333313,0.25656309723854065,0.15721426904201508,0.15721426904201508,0.15721426904201508,0]},"$$$/app/Presets/EssentialSound/EQPreset/PodcastVoice=Podcast Voice":{"type":"array::float","value":[0.12099699676036835,0.5,0.39240506291389465,0,0.5,0.5,0.5,0.5178940892219543,0.507703423500061,0.5,0.5178940892219543,0.528114914894104,0.5102812647819519,0.5,0]},"$$$/app/Presets/EssentialSound/EQPreset/SubtleBoostHighTone=Subtle Boost (High Tone)":{"type":"array::float","value":[0.09655340015888214,0.5,0.29113924503326416,0,0.5,0.5,0.5,0.5,0.5,0.519334077835083,0.5464289784431458,0.5270676612854004,0.5,0.5,0]},"$$$/app/Presets/EssentialSound/EQPreset/SubtleBoostLowTone=Subtle Boost (Low Tone)":{"type":"array::float","value":[0.09655340015888214,0.5,0.29113924503326416,0,0.5,0.5,0.5,0.5,0.5,0.5135338306427002,0.5464289784431458,0.519334077835083,0.5,0.5,0]},"$$$/app/Presets/EssentialSound/EQPreset/ThatPublicRadioSound=That Public Radio Sound":{"type":"array::float","value":[0.12099699676036835,0.5,0.797468364238739,0,0.15721426904201508,0.15721426904201508,0.15721426904201508,0.3633434474468231,0.4946831166744232,0.5,0.5,0.5,0.5,0.5,0]},"$$$/app/Presets/EssentialSound/EQPreset/VocalPresence=Vocal Presence":{"type":"array::float","value":[0.09655340015888214,0.5,0.324894517660141,0,0.3572143018245697,0.3572143018245697,0.4642857015132904,0.47857141494750977,0.4763694703578949,0.4957035481929779,0.5592495799064636,0.5652339458465576,0.5085929036140442,0.46992480754852295,0]}}}},"model_loudness":{"DefaultLoudness":{"type":"float","value":-23},"LoudnessStandard":{"type":"std::uint32_t","value":0},"MaxLoudness":{"type":"float","value":-12},"MinLoudness":{"type":"float","value":-42}},"model_restoration":{"ReduceNoiseMaxSetting":{"type":"array::float","value":[1,0,0,0,0]},"ReduceNoiseMinSetting":{"type":"array::float","value":[0,0,0,0,0]},"ReduceReverbMaxSetting":{"type":"array::float","value":[1,0,1,0,0]},"ReduceReverbMinSetting":{"type":"array::float","value":[0,0,1,0,0]},"ReduceRumbleMaxSetting":{"type":"array::float","value":[1,0.06158357858657837,0.375,0,0,0.0008333333535119891,1,0,1,0.0390625,0.0008340898784808815,0,0.004166666883975267,0.00022554649331141263,0.004687500186264515,0.75,0.0052083334885537624,0.75,1,0.75,0.004052083473652601,0.75,0.004262916743755341,0.00022554649331141263,0.006488333456218243,0.00022554649331141263,0.006866666954010725,0.75,0.007170416414737701,0.00022554649331141263,0.01041458360850811,0.00022554649331141263,0.010900000110268593,0.75,0.011407917365431786,0.00022554649331141263,0.015606249682605267,0.00022554649331141263,0.016333334147930145,0.75,0.017094582319259644,0.00022554649331141263,0.026243748143315315,0.00022554649331141263,0.0274666678160429,0.75,0.02874666638672352,0.00022554649331141263,0.04165875166654587,0.00022554649331141263,0.04360000044107437,0.75,0.04563166946172714,0.00022554649331141263,0.06242458149790764,0.00022554649331141263,0.06533333659172058,0.75,0.06837750226259232,0.00022554649331141263,0.10497540980577469,0.00022554649331141263,0.1098666712641716,0.75,0.11498583108186722,0.00022554649331141263,0.16663584113121033,0.00022554649331141263,0.17440000176429749,0.75,0.18252624571323395,0.00022554649331141263,0.918749988079071,0.00022554649331141263,1,0.00022554649331141263,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"ReduceRumbleMinSetting":{"type":"array::float","value":[1,0.06158357858657837,0.375,0,0,0.0008333333535119891,1,0,1,0.0390625,0.0008340898784808815,0.75,0.004166666883975267,0.75,0.004687500186264515,0.75,0.0052083334885537624,0.75,1,0.75,0.918749988079071,0.6123724579811096,1,0.6123724579811096,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"ReduceSibilanceMaxSetting":{"type":"array::float","value":[0.5,0.1998399794101715,0.18367347121238708,0.260869562625885,0.5270270109176636,0,1,0,0,0,0,0.75,1,1,0.4000000059604645]},"ReduceSibilanceMinSetting":{"type":"array::float","value":[0.875,0.1998399794101715,0.18367347121238708,0.19130434095859528,0.2567567527294159,0,1,0,0,0,0,0.75,1,1,0.4000000059604645]}},"model_soundeffects":{"ReverbPresets":{"type":"tree::any","value":{"$$$/app/Presets/EssentialSound/ReverbPreset/Auditorium=Auditorium":{"type":"array::float","value":[0.013047545216977596,0.15895412862300873,1,0.8999999761581421,0,0.5200743675231934,0.41663265228271484,0.46000000834465027,0.5,0.7300000190734863,0.1599999964237213,0.7537688612937927,0.03125]},"$$$/app/Presets/EssentialSound/ReverbPreset/Church=Church":{"type":"array::float","value":[0.032663315534591675,0.39939939975738525,0.7979797720909119,0.25,0.5,0.5,0.2297959178686142,0.7200000286102295,0.5,0.6299999952316284,0.8799999952316284,0.2512562870979309,0.03125]},"$$$/app/Presets/EssentialSound/ReverbPreset/LargeReflectiveRoom=Large Reflective Room":{"type":"array::float","value":[0.007444901391863823,0.09898842126131058,0.7989053726196289,0.8999999761581421,0.10000000149011612,0.40110713243484497,0.060284845530986786,0.2752297818660736,0.5,0.7300000190734863,0.3199999928474426,0.2512562870979309,0.03125]},"$$$/app/Presets/EssentialSound/ReverbPreset/OutsideTheClub=Outside the Club":{"type":"array::float","value":[0.020615793764591217,0.05013655871152878,0.6969699859619141,0.25,0.09435578435659409,0.22242647409439087,0.1071428582072258,0.2800000011920929,0.5,0.7300000190734863,0.46000000834465027,0.2512562870979309,0.03125]},"$$$/app/Presets/EssentialSound/ReverbPreset/SmallDryRoom=Small Dry Room":{"type":"array::float","value":[0.24623115360736847,0.6997500061988831,0.2929289937019348,0.4000000059604645,0.20000000298023224,0.4000000059604645,0.03928571566939354,0.10000000149011612,0.5,1,0.5,0.7537688612937927,0.03125]},"$$$/app/Presets/EssentialSound/ReverbPreset/ThickenVoice=Thicken Voice":{"type":"array::float","value":[0.1959799975156784,0.23931467533111572,0.6969699859619141,0.25,0.5,0.5399999618530273,0.020408162847161293,0.20945435762405396,0.5,1,0.3499999940395355,0.2512562870979309,0.03125]},"$$$/app/Presets/EssentialSound/ReverbPreset/WarmRoom=Warm Room":{"type":"array::float","value":[0.02010050229728222,0.07407407462596893,0.49494948983192444,0.4000000059604645,0.7496030926704407,0.4000000059604645,0.1239795908331871,0.6700000166893005,0.5,0.8500000238418579,0.5600000023841858,0.2512562870979309,0.03125]},"$$$/app/Presets/EssentialSound/ReverbPreset/WarmVoice=Warm Voice":{"type":"array::float","value":[0.19597989320755005,0.8998998999595642,0,0.4000000059604645,0.20000000298023224,0.4000000059604645,0.10204081982374191,0.09000000357627869,0.5,1,0.30000001192092896,0.2512562870979309,0.03125]}}}},"model_volume":{"MaxGain":{"type":"float","value":15},"MinGain":{"type":"float","value":-60}}},"Version":2},"Type":"1c19ca71-c24c-49cd-8dd5-2cc46018507a","Version":1},{"Guid":"353811fa-4179-435e-8e5e-23028ba15a7a","Name":"$$$/app/Presets/DefaultPresetName=(Default)","PresetData":{"ModeID":"generic","Models":{"model_loudness":{"DefaultLoudness":{"type":"float","value":-24},"LoudnessStandard":{"type":"std::uint32_t","value":0},"MaxLoudness":{"type":"float","value":-12},"MinLoudness":{"type":"float","value":-42}},"model_volume":{"MaxGain":{"type":"float","value":15},"MinGain":{"type":"float","value":-60}}},"Version":1},"Type":"1c19ca71-c24c-49cd-8dd5-2cc46018507a","Version":1},{"Guid":"31ba96a6-5d3e-4d89-b1e1-1dbe3c055d0c","Name":"$$$/app/Presets/DefaultPresetName=(Default)","PresetData":{"ModeID":"music","Models":{"model_ducking":{},"model_duration":{},"model_loudness":{"DefaultLoudness":{"type":"float","value":-25},"LoudnessStandard":{"type":"std::uint32_t","value":0},"MaxLoudness":{"type":"float","value":-12},"MinLoudness":{"type":"float","value":-42}},"model_volume":{"MaxGain":{"type":"float","value":15},"MinGain":{"type":"float","value":-60}}},"Version":1},"Type":"1c19ca71-c24c-49cd-8dd5-2cc46018507a","Version":1},{"Guid":"cea63332-1adc-44a9-a6eb-5490f965859b","Name":"$$$/app/Presets/DefaultPresetName=(Default)","PresetData":{"ModeID":"sfx","Models":{"model_loudness":{"DefaultLoudness":{"type":"float","value":-21},"LoudnessStandard":{"type":"std::uint32_t","value":0},"MaxLoudness":{"type":"float","value":-12},"MinLoudness":{"type":"float","value":-42}},"model_pan":{},"model_soundeffects":{"ReverbPresets":{"type":"tree::any","value":{"$$$/app/Presets/EssentialSound/ReverbPreset/HeavyReverb=Heavy Reverb":{"type":"array::float","value":[0.13316600024700165,0.2992990016937256,1,0.9599999785423279,0.8500000238418579,0.5,0.5153059959411621,0.30000001192092896,0.5,0.5,0.5,0.2512562870979309,0.0625]},"$$$/app/Presets/EssentialSound/ReverbPreset/LightReverb=Light Reverb":{"type":"array::float","value":[0.0954774022102356,0.2992990016937256,0.09090910106897354,1,1,0.800000011920929,0.2244900017976761,0.6000000238418579,0.5,0.699999988079071,0.30000001192092896,0.2512562870979309,0.0625]},"$$$/app/Presets/EssentialSound/ReverbPreset/OutsideReverb=Outside Reverb":{"type":"array::float","value":[0.09170850366353989,0.04389389976859093,1,0.5,0.20000000298023224,0.800000011920929,0.18367299437522888,1,0.5,0,0.800000011920929,0.2512562870979309,0.0625]},"$$$/app/Presets/EssentialSound/ReverbPreset/RoomReverb=Room Reverb":{"type":"array::float","value":[0.0577889010310173,0.44944900274276733,0.49494898319244385,0.8999999761581421,0.10000000149011612,0.15000000596046448,0.08163270354270935,0.4000000059604645,0.5,0.800000011920929,0.20000000298023224,0.2512562870979309,0.0625]}}}},"model_volume":{"MaxGain":{"type":"float","value":15},"MinGain":{"type":"float","value":-60}}},"Version":1},"Type":"1c19ca71-c24c-49cd-8dd5-2cc46018507a","Version":1}]</property>
    </properties>
  </session>

  <files/>

  <audioDevice inputID="22222222-2222-2222-2222-22222222" outputID="11111111-1111-1111-1111-11111111">
    <inputPort id="1" name="默认立体声输入"/>
    <inputPort id="2" name="[01M] 系统默认 - Microphone (Realtek USB2.0 Audio) 1"/>
    <inputPort id="3" name="[02M] 系统默认 - Microphone (Realtek USB2.0 Audio) 2"/>
    <inputPort id="4" name="[01S] 系统默认 - Microphone (Realtek USB2.0 Audio) 1"/>
    <outputPort id="1" name="默认输出"/>
    <outputPort id="2" name="[01M] 系统默认 - PHL 499P9 (NVIDIA High Definition Audio) 1"/>
    <outputPort id="3" name="[02M] 系统默认 - PHL 499P9 (NVIDIA High Definition Audio) 2"/>
    <outputPort id="4" name="默认立体声输出"/>
    <outputPort id="5" name="[01S] 系统默认 - PHL 499P9 (NVIDIA High Definition Audio) 1"/>
    <outputPort id="6" name="默认环绕声输出"/>
  </audioDevice>

</sesx>`;

interface FormValues {
  sessionName: string;
  sampleRate: string;
}

export default function CreateSessionForm() {
  const [workspacePath] = useLocalStorage<string>({
    key: "au-cep-workspace-path",
    defaultValue: "",
  });

  const form = useForm<FormValues>({
    initialValues: {
      sessionName: "",
      sampleRate: "48000",
    },

    validate: {
      sessionName: (value) => {
        if (!value.trim()) return "请输入会话名称";
        if (/[\\/:*?"<>|]/.test(value)) return "会话名称不能包含字符: \\ / : * ? \" < > |";
        return null;
      },
    },
  });

  const handleSubmit = (values: FormValues) => {
    if (!workspacePath) {
      modals.openContextModal({
        modal: "alertModal",
        title: "未设置工作区目录",
        innerProps: {
          message: "请先在顶部设置工作区目录，再创建会话。",
          type: "error",
        },
      });
      return;
    }

    if (!fs.existsSync(workspacePath)) {
      modals.openContextModal({
        modal: "alertModal",
        title: "工作区目录无效",
        innerProps: {
          message: "当前设置的工作区目录在磁盘上不存在，请重新选择。",
          type: "error",
        },
      });
      return;
    }

    const sessionDir = path.join(workspacePath, values.sessionName.trim());

    if (fs.existsSync(sessionDir)) {
      modals.openContextModal({
        modal: "alertModal",
        title: "创建失败",
        innerProps: {
          message: (
            <>
              工作区中已存在名为 <Text span fw={700}>“{values.sessionName.trim()}”</Text> 的会话文件夹，请更换会话名称。
            </>
          ),
          type: "error",
          buttonText: "我知道了",
        },
      });
      return;
    }

    try {
      if (fs.mkdirSync) {
        fs.mkdirSync(sessionDir, { recursive: true });
      }

      const updatedSesxContent = SESX_TEMPLATE.replace(
        /sampleRate="48000"/,
        `sampleRate="${values.sampleRate}"`
      );

      const sesxFilePath = path.join(sessionDir, `${values.sessionName.trim()}.sesx`);
      if (fs.writeFileSync) {
        fs.writeFileSync(sesxFilePath, updatedSesxContent, "utf-8");
      }

      const normalizedPath = sesxFilePath.replace(/\\/g, "/");
      evalTS("openSesxFile", normalizedPath);
    } catch (err: any) {
      console.error("创建会话失败:", err);
      modals.openContextModal({
        modal: "alertModal",
        title: "文件操作失败",
        innerProps: {
          message: `无法创建文件夹或文件: ${err?.message || "未知错误"}`,
          type: "error",
        },
      });
    }
  };

  return (
    <Paper p="md" radius="md" withBorder style={{ maxWidth: 450, margin: "20px auto" }}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <Group gap="xs">
            <IconFolderPlus size={24} />
            <Title order={4}>新建 Audition 会话</Title>
          </Group>

          <TextInput
            label="会话名称"
            placeholder="请输入会话名称（如：Podcast_Episode_01）"
            required
            withAsterisk
            {...form.getInputProps("sessionName")}
          />

          <Select
            label="采样率"
            data={[
              { value: "48000", label: "48000 Hz (推荐)" },
              { value: "44100", label: "44100 Hz" },
            ]}
            allowDeselect={false}
            required
            {...form.getInputProps("sampleRate")}
          />

          <Button
            type="submit"
            fullWidth
            mt="xs"
          >
            确定创建
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}