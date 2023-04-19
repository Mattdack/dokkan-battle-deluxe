export default function getCharacterInfo (characterInfo) {
        const textBoxEl = characterInfo

        // specified/prepping content ============
        let rQuote = textBoxEl.replace(/"/g, "")
        let rSAName = rQuote.replace('|SA name', "\n|SA name").replace('| SA name','\n|SA name').replace('|UltraSA name', "\n|UltraSA name").replace('|UltraSA description','\n|UltraSA description').replace('|PS description','\n|PS description')
        let rPettan = rSAName.replace('|Pettan = yes', "")
        let rMoveASCond = rPettan.replace('|Active skill condition', '\n|Active skill condition').replace('|Active skill name', '\n|Active skill name')
        let rEqualSign = rMoveASCond.replace(/ =/g, ':')
        let rLineBreak = rEqualSign.replace('<br>', "").replace('</br>', "")

        let rServerIcon = rLineBreak.replace('File:Japan server.png|20px', "").replace('File:Global server.png|20px', "").replace('File:Card','').replace('File: Card ','')

        let rExtraCatInLink = rServerIcon.replace('Androids-Cell Saga|', "").replace('Kamehameha (Category)|', "").replace('Otherworld Warriors (Link Skill)|', "").replace('Turtle School (Link Skill)|', "").replace('Namekians (Link Skill)|', "").replace('Team Bardock (Link Skill)|', "").replace(':Category:Extreme Class|', "").replace(':Category:Super Class|', "").replace('Fusion (Link Skill)|', "")

        let rExtraDisambig = rExtraCatInLink
        .replace('Goku (disambiguation)|', "")
        .replace('Goku (disambiguation)#Goku|', "")
        .replace('Goku (disambiguation)#Goku (Angel)|', "")
        .replace('Goku (disambiguation)#Super Saiyan Goku|', "")
        .replace('Goku (disambiguation)#Goku (Youth)|', "")
        .replace('Caulifla (disambiguation)|', "")
        .replace('Cooler (disambiguation)|', "")
        .replace('Trunks (disambiguation)|', "")
        .replace('Bardock (disambiguation)|', "")
        .replace('Android 18 (disambiguation)|', '')
        .replace('Android 18 (disambiguation)#Android #18|', "")
        .replace('(disambiguation)#Ribrianne|', "")
        .replace('Rozie (disambiguation)|', "")
        .replace('Kakunsa (disambiguation)|', "")
        .replace('Kale (disambiguation)|', "")
        .replace('Tapion (disambiguation)|', "")
        .replace('Gohan (disambiguation)#Gohan (Kid)|', "")
        .replace('Frieza (disambiguation)|', "")
        .replace('Vegeta (disambiguation)|', "")
        .replace('Cooler (disambiguation)#Metal Cooler|', "")
        .replace('Giru (disambiguation)|', "")
        .replace('Cell (disambiguation)|', "")
        .replace('Boujack (disambiguation)|', "")
        .replace('Gohan (disambiguation)#Gohan (Teen)|', "")
        .replace('Gohan (disambiguation)#Ultimate Gohan|', "")
        .replace('Gohan (disambiguation)#Great Saiyaman|', "")
        .replace('Gohan (disambiguation)#Gohan (Future)|', "")
        .replace('Trunks (disambiguation)#Trunks (Kid)|', "")
        .replace('Trunks (disambiguation)#Trunks (Teen)|', "")
        .replace('Goten (disambiguation)#Goten (Kid)|', "")
        .replace('Goten (disambiguation)|,','')
        .replace('(disambiguation)|Goten','')
        .replace('Piccolo (disambiguation)|', '')
        .replace('Piccolo (disambiguation)#Piccolo|', "")
        .replace('Cell (disambiguation)#Cell (Perfect Form)|', "")
        .replace('Cell (disambiguation)#Perfect Cell|', "")
        .replace('Gohan (disambiguation)#Super Saiyan Gohan (Youth)|', "")
        .replace('Gohan (disambiguation)#Super Saiyan 2 Gohan (Youth)|', "")
        .replace('Android 14 (disambiguation)#Androids #14 & #15|', "")
        .replace('Android 16 (disambiguation)|', "")
        .replace('Android 17 (disambiguation)#Android #17|', "")
        .replace('Android 17 (disambiguation)|#17', "")
        .replace('Android 18 (disambiguation)#Android #18 (Future)|', "")
        .replace('Android 17 (disambiguation)#Android #17 (Future)|', "")
        .replace('Ginyu (disambiguation)|', "")
        .replace('Android 13 (disambiguation)#Android #13|', "")
        .replace('Android 13 (disambiguation)#Fusion Android #13|', "")
        .replace('Zamasu (disambiguation)#Zamasu|', "")
        .replace('Zamasu (disambiguation)#Goku Black|', "")
        .replace('Trunks (disambiguation)#Trunks (Teen) (Future)|', "")
        .replace('Mai (disambiguation)#Mai (Future)|', "")
        .replace('Beerus (disambiguation)|', "")
        .replace('Krillin (disambiguation)#Krillin|', "")
        .replace('Krillin (disambiguation)|Krillin', "")
        .replace('Bulma (disambiguation)|', "")
        .replace('Bulma (disambiguation)#Bulma (Youth)|', "")

        let rSphereFile = rExtraDisambig.replace('File:Rainbow icon.png|30px|link=', "").replace('File:Rainbow icon.png|30px', 'Rainbow').replace('File:AGL icon.png|30px|link=Category:', "").replace('File:AGL  icon.png|30px|link=Category:', "").replace('File:TEQ icon.png|30px|link=Category:', "").replace('File:INT icon.png|30px|link=Category:', "").replace('File: INT icon.png|30px|link=Category:', "").replace('File:STR icon.png|30px|link=Category:', "").replace('File:PHY icon.png|30px|link=Category:', "").replace('File: PHY icon.png|30px|link=Category:PHY', '')

        let rSSphereFile = rSphereFile.replace('File:SAGL icon.png|30px|link=Category:', "").replace('File:STEQ icon.png|30px|link=Category:', "").replace('File:SINT icon.png|30px|link=Category:', "").replace('File:SSTR icon.png|30px|link=Category:', "").replace('File:SPHY icon.png|30px|link=Category:', "").replace('([[:File:UR Giant Brianne Origin 1.png|origin]])','')

        let rESphereFile = rSSphereFile.replace('File:EAGL icon.png|30px|link=Category:', "").replace('File:ETEQ icon.png|30px|link=Category:', "").replace('File:EINT icon.png|30px|link=Category:', "").replace('File:ESTR icon.png|30px|link=Category:', "").replace('File:EPHY icon.png|30px|link=Category:', "")

        let rSphereExclude = rESphereFile.replace('icon.png|30px', "").replace(' thumb.png|120px','').replace(' thumb.png |120px','').replace(' thumb apng.png','').replace(' artwork apng.png','').replace('artwork apng.png','').replace(' artwork apng.webp','').replace('artwork apng.webp','')

        let rStackAtt = rSphereExclude.replace('([[Stack Attack|How does it work?]])', "").replace('Super Attack Multipliers|SA Multiplier', "super attack").replace('Lower ATK|','')

        let rName1 = rStackAtt.replace(/ name="\[1\]"/g, "").replace(/name=\[1\]/g, "").replace(/name": \[1\]/g, "").replace(/name":\[1\]/g, "")
        let rName2 = rName1.replace(/ name="\[2\]"/g, "").replace(/name=\[2\]/g, "").replace(/name": \[2\]/g, "").replace(/name":\[2\]/g, "")
        let rName3 = rName2.replace(/ name="\[3\]"/g, "").replace(/name=\[3\]/g, "").replace(/name": \[3\]/g, "").replace(/name":\[3\]/g, "")
        let rName4 = rName3.replace(/ name="\[4\]"/g, "").replace(/name=\[4\]/g, "").replace(/name": \[4\]/g, "").replace(/name":\[4\]/g, "")
        let rName5 = rName4.replace(/ name="\[5\]"/g, "").replace(/name=\[5\]/g, "").replace(/name": \[5\]/g, "").replace(/name":\[5\]/g, "")
        let rName6 = rName5.replace(/ name="\[6\]"/g, "").replace(/name=\[6\]/g, "").replace(/name": \[6\]/g, "").replace(/name":\[6\]/g, "")
        let rName7 = rName6.replace(/ name="\[7\]"/g, "").replace(/name=\[7\]/g, "").replace(/name": \[7\]/g, "").replace(/name":\[7\]/g, "")
        let rName8 = rName7.replace(/ name="\[8\]"/g, "").replace(/name=\[8\]/g, "").replace(/name": \[8\]/g, "").replace(/name":\[8\]/g, "")
        let rName9 = rName8.replace(/ name="\[9\]"/g, "").replace(/name=\[9\]/g, "").replace(/name": \[9\]/g, "").replace(/name":\[9\]/g, "")
        let rName10 = rName9.replace(/name=\[10\]/g, "").replace(/name=\[10\]/g, "").replace(/name": \[10\]/g, "").replace(/name":\[10\]/g, "")

        let rArrow = rName10.replace(/<!--/g,'').replace(/-->/g,'');
        let rSmall = rArrow.replace(/<small>/g,'').replace(/<\/small>/g,'');
        let rSpace = rSmall.replace(/\t/g,'');
        let rIFrame = rSpace.replace(/<i>/g, '').replace(/<\/i>/g, '');
        let rRef = rIFrame.replace(/<ref>/g, '  <').replace(/<ref >/g, '<');
        let rRef2 = rRef.replace(/<\/ref>/g, '>');
        let rDash = rRef2.replace(/ - /g, ',');
        let rLB = rDash.replace(/\[\[/g, '');
        let rRB = rLB.replace(/\]\]/g, '');

        // console.log(rRB)

        // # ======= this is POST-EDITING print =======
        let lines = rRB.split("\n")

        // start attribute grabbing from cards ==================
        let extraSpace1 = '{\n'
        // let charWikiLink = (wikiURL).replace('?action=edit', "")
        let charThumb = []
        let charArt = []
        let charName1 = []
        let charName2 = []
        let charRarity = []
        let charType = []
        let charCost = []
        let charID = []
        let charLS = []
        let charLSEza = []
        let charSaType = []
        let charSaName = []
        let charSaDesc = []
        let charSaDescEza = []
        let charUltraType = []
        let charUltraName = []
        let charUltraDesc = []
        let charUltraDescEza = []
        let charPsName = []
        let charPsDesc = []
        let charPsDescEza = []
        let charASType = []
        let charASName = []
        let charAS = []
        let charASCond = []
        let charASCondEza = []
        let charTransformType = []
        let charTransformCond = []
        let charTransformCondEza = []
        let charLinkSkills = []
        let charCategories = []
        let charJPDate = []
        let charGLBDate = []
        let charJPDateEza = []
        let charGLBDateEza = []
        let extraSpace2 = '},\n'


        for (let i = 0; i < lines.length; i++) {
            let myline = lines[i]
            if (myline.includes('|thumb:')){
                charThumb.push(myline.replace('|thumb:', '').replace(':', '', 1).replace('" ','').replace('" ','').replace('\n', ',\n'))            
            }
            if (myline.includes('|artwork link:')){
                charArt.push(myline.replace('|artwork link:', '').replace('artwork link','art').replace(':', '', 1).replace('" ','').replace('" ','').replace('\n', ',\n'))
            }
            if (myline.includes('|name1: ')){
                charName1.push(myline.replace('|name1: ', '').replace("name1", 'title').replace(':', '"', 1).replace('" ','').replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|name2:')){
                charName2.push(myline.replace('|name2', '').replace("name2", 'name').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|rarity:')){
                charRarity.push(myline.replace('|rarity', '').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|type:')){
                charType.push(myline.replace('|type', '').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|cost:')){
                charCost.push(myline.replace('|cost', '').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|ID:')){
                charID.push(myline.replace('|ID', '').replace('ID', 'id').replace(':', '', 1).replace('\n', ',\n'))
            }
            if (myline.includes('|LS description:')){
                charLS.push(myline.replace('|LS description', '').replace("LS description", "ls_description").replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|LS description Z:')){
                charLSEza.push(myline.replace('|LS description Z', '').replace("LS description Z", "ls_description_eza").replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|SA type:')){
                charSaType.push(myline.replace('|SA type', '').replace('SA type', 'sa_type').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|SA name:')){
                charSaName.push(myline.replace('|SA name', '').replace('SA name', 'sa_name').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|SA description:')){
                charSaDesc.push(myline.replace('|SA description', '').replace('SA description', 'sa_description').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|SA description Z:')){
                charSaDescEza.push(myline.replace('|SA description Z', '').replace('SA description Z', 'sa_description_eza').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|UltraSA type:')){
                charUltraType.push(myline.replace('|UltraSA type', '').replace('UltraSA type', 'ultra_sa_type').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|UltraSA name:')){
                charUltraName.push(myline.replace('|UltraSA name', '').replace('UltraSA name', 'ultra_sa_name').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|UltraSA description:')){
                charUltraDesc.push(myline.replace('|UltraSA description', '').replace('UltraSA description', 'ultra_sa_description').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|UltraSA description Z:')){
                charUltraDescEza.push(myline.replace('|UltraSA description Z', '').replace('UltraSA description Z', 'ultra_sa_description_eza').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|PS name:')){
                charPsName.push(myline.replace('|PS name', '').replace('PS name', 'ps_name').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|PS description:')){
                charPsDesc.push(myline.replace('|PS description', '').replace('PS description', 'ps_description').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|PS description Z:')){
                charPsDescEza.push(myline.replace('|PS description Z', '').replace('PS description Z', 'ps_description_eza').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|SA type Active:')){
                charASType.push(myline.replace('|SA type Active', '').replace('SA type Active', 'sa_type_active').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|Active skill name:')){
                charASName.push(myline.replace('|Active skill name', '').replace('Active skill name', 'active_skill_name').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|Active skill:')){
                charAS.push(myline.replace('|Active skill', '').replace('Active skill', 'active_skill').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|Active skill condition:')){
                charASCond.push(myline.replace('|Active skill condition', '').replace('Active skill condition', 'active_skill_condition').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|Active skill condition Z:')){
                charASCondEza.push(myline.replace('|Active skill condition Z', '').replace('Active skill condition Z', 'active_skill_condition_eza').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|Transform type:')){
                charTransformType.push(myline.replace('|Transform type', '').replace('Transform type', 'transform_type').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|Transform condition:')){
                charTransformCond.push(myline.replace('|Transform condition', '').replace('Transform condition', 'transform_condition').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|Transform condition Z:')){
                charTransformCondEza.push(myline.replace('|Transform condition Z', '').replace('Transform condition Z', 'transform_condition_eza').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|Link skill:')){
                charLinkSkills.push(myline.replace('|Link skill', '').replace('Link skill', 'link_skill').replace('" ', '').replace(': ', '', 1).replace('\n', ',\n'))
            }
            if (myline.includes('|Category:')){
                charCategories.push(myline.replace('|Category', '').replace('Category', 'category').replace('" ', '').replace(': ', '', 1).replace('\n', ',\n'))
            }
            if (myline.includes('|JPdate: ')){
                charJPDate.push(myline.replace('|JPdate', '').replace('JPdate', 'jp_date').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|GLBdate: ')){
                charGLBDate.push(myline.replace('|GLBdate', '').replace('GLBdate', 'glb_date').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|JPdateEZA: ')){
                charJPDateEza.push(myline.replace('|JPdateEZA', '').replace('JPdateEZA', 'jp_date_eza').replace(':', '"', 1).replace('" ','').replace('\n', '",\n'))
            }
            if (myline.includes('|GLBdateEZA: ')){
                charGLBDateEza.push(myline.replace('|GLBdateEZA', '').replace('GLBdateEZA', 'glb_date_eza').replace(':', '"', 1).replace('" ','').replace('\n', '"\n'))
            }
            }
            
            if (charThumb === ['"thumb":  ,'] || charThumb.length === 0){
                charThumb = [null]
            }
            if (charArt === [] || charArt.length === 0){
                charArt = [null]
            }
            if (charName1 === [] || charName1.length === 0){
                charName1 = [null]
            }
            if (charName2 === [] || charName2.length === 0){
                charName2 = [null]
            }
            if (charRarity === [] || charRarity.length === 0){
                charRarity = [null]
            }
            if (charType === [] || charType.length === 0){
                charType = [null]
            }
            if (charCost === [] || charCost.length === 0){
                charCost = [null]
            }
            if (charID === [] || charID.length === 0){
                charID = [null]
            }
            if (charLS === [] || charLS.length === 0){
                charLS = [null]
            }
            if (charLSEza === [] || charLSEza.length === 0){
                charLSEza = [null]
            }
            if (charSaType === [] || charSaType.length === 0){
                charSaType = [null]
            }
            if (charSaName === [] || charSaName.length === 0){
                charSaName = [null]
            }
            if (charSaDesc === [] || charSaDesc.length === 0){
                charSaDesc = [null]
            }
            if (charSaDescEza === [] || charSaDescEza.length === 0){
                charSaDescEza = [null]
            }
            if (charUltraType === [] || charUltraType.length === 0){
                charUltraType = [null]
            }
            if (charUltraName === [] || charUltraName.length === 0){
                charUltraName = [null]
            }
            if (charUltraDesc === [] || charUltraDesc.length === 0){
                charUltraDesc = [null]
            }
            if (charUltraDescEza === [] || charUltraDescEza.length === 0){
                charUltraDescEza = [null]
            }
            if (charPsDescEza === [] || charPsDescEza.length === 0){
                charPsDescEza = [null]
            }
            if (charPsName === [] || charPsName.length === 0){
                charPsName = [null]
            }
            if (charPsDesc === [] || charPsDesc.length === 0){
                charPsDesc = [null]
            }
            if (charPsDescEza === [] || charPsDescEza.length === 0){
                charPsDescEza = [null]
            }
            if (charASType === [] || charASType.length === 0){
                charASType = [null]
            }
            if (charASName === [] || charASName.length === 0){
                charASName = [null]
            }
            if (charAS === [] || charAS.length === 0){
                charAS = [null]
            }
            if (charASCond === [] || charASCond.length === 0){
                charASCond = [null]
            }
            if (charASCondEza === [] || charASCondEza.length === 0){
                charASCondEza = [null]
            }
            if (charTransformType === [] || charTransformType.length === 0){
                charTransformType = [null]
            }
            if (charTransformCond.length === 0){
                charTransformCond = [null]
            }
            if (charTransformCondEza.length === 0){
                charTransformCondEza = [null]
            }
            if (charLinkSkills.length === 0){
                charLinkSkills = [null]
            }
            if (charCategories.length === 0){
                charCategories = [null]
            }
            if (charJPDate.length === 0){
                charJPDate = [null]
            }
            if (charGLBDate.length === 0){
                charGLBDate = [null]
            }
            if (charJPDateEza.length === 0){
                charJPDateEza = [null] 
            }
            if (charGLBDateEza.length === 0){
                charGLBDateEza = [null]
            }
            const results = {
                // charWikiLink: charWikiLink,
                id: charID[0],
                thumb: charThumb[0],
                art: charArt[0],
                title: charName1[0],
                name: charName2[0],
                rarity: charRarity[0],
                type: charType[0],
                cost: charCost[0],
                ls_description: charLS[0],
                ls_description_eza: charLSEza[0],
                sa_type: charSaType[0],
                sa_name: charSaName[0],
                sa_description: charSaDesc[0],
                sa_description_eza: charSaDescEza[0],
                ultra_sa_type: charUltraType[0],
                ultra_sa_name: charUltraName[0],
                ultra_sa_description: charUltraDesc[0],
                ultra_sa_description_eza: charUltraDescEza[0],
                ps_name: charPsName[0],
                ps_description: charPsDesc[0],
                ps_description_eza: charPsDescEza[0],
                sa_type_active: charASType[0],
                active_skill_name: charASName[0],
                active_skill: charAS[0],
                active_skill_condition: charASCond[0],
                active_skill_condition_eza: charASCondEza[0],
                transform_type: charTransformType[0],
                transform_condition: charTransformCond[0],
                transform_condition_eza: charTransformCondEza[0],
                link_skill: charLinkSkills[0],
                category: charCategories[0],
                jp_date: charJPDate[0],
                glb_date: charGLBDate[0],
                jp_date_eza: charJPDateEza[0],
                glb_date_eza: charGLBDateEza[0]
            };
            
            console.log(results)
            return results
        }