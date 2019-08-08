import React from "react"
import * as THREE from "three"
import SceneManager from "../utils/SceneManager"
import { Range } from "rc-slider"
import "rc-slider/assets/index.css"
const width = 400, height = 400;
const dimension = 20;
const cameraDistance = 35;

const cubes = []
class Viewer extends React.Component {
    state = {
        minX: 0,
        maxX: dimension,
        minY: 0,
        maxY: dimension,
        minZ: 0,
        maxZ: dimension,
        cubeData: []
    }
    componentDidMount(){
        SceneManager.init(width, height);
        SceneManager.getCamera().position.z = cameraDistance
        this.mount.appendChild(SceneManager.getDomElement())

        const geometry = new THREE.BoxGeometry(1,1,1)
        const texture = new THREE.TextureLoader().load('textures/atlas.png')
        texture.magFilter = THREE.NearestFilter;
        const material = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide } );        

        const makeCube = (x = 0,y = 0,z = 0) => {
            const cube = new THREE.Mesh(geometry, material)
            cube.position.x = x
            cube.position.y = y
            cube.position.z = z
            return cube;
        }
        const group = new THREE.Group();
        
        
        const cubeData = []
        for(var k = 0; k < dimension; k++){
            for(var j = 0; j < dimension; j++){
                for(var i = 0; i < dimension; i++ ){
                    const cube = makeCube(i-(dimension/2),j-(dimension/2),k-(dimension/2));
                    cubes.push(cube)
                    if(Math.random() > 0.7){
                        cube.visible = false
                        cubeData.push(0)
                    } else {
                        cubeData.push(1)
                    }
                    group.add(cube)
                }
            }
        }
        this.setState({
            cubeData
        })


        // Let's build a 5x5 grid of cubes
        SceneManager.add(group)
        group.rotation.x += Math.PI/5;
        group.rotation.y += Math.PI/4;
        const animate = () => {
            requestAnimationFrame(animate)
            // cube2.position.x -= 0.005
            // cube3.position.y += 0.005
            //group.rotation.x += 0.005
            group.rotation.y += 0.002
            
            SceneManager.render()
        }
        requestAnimationFrame(animate)

    }
    componentDidUpdate(){
        // go through and set the visibility of all the pieces
        const {minX, maxX, minY, maxY, minZ, maxZ, cubeData } = this.state; 
        for(var k = 0; k < dimension; k++){
            for(var j = 0; j < dimension; j++){
                for(var i = 0; i < dimension; i++ ){
                    const index = i + j * dimension + k * dimension * dimension
                    if(i < minX || i > maxX || j < minY || j > maxY || k < minZ || k > maxZ ){
                        
                        cubes[index].visible = false
                    } else {
                        cubes[index].visible = cubeData[index] ? true : false
                        //cubes[i + j * dimension + k * dimension * dimension]
                    }
                }
            }
        }
    }
    render(){
        return (
            <div>
                <div style={{width, height}} ref={mount => this.mount = mount}>
                </div>
                <div>
                    <div style={{width}}>
                        X: [{this.state.minX}, {this.state.maxX}] 
                        <Range value={[this.state.minX, this.state.maxX]}min={0} max={dimension} pushable={1} onChange={([minX, maxX]) => { this.setState({minX, maxX}) }} />
                    </div>
                    <div style={{width}}>
                        Y: [{this.state.minY}, {this.state.maxY}]  
                        <Range value={[this.state.minY, this.state.maxY]}min={0} max={dimension} pushable={1} onChange={([minY, maxY]) => { this.setState({minY, maxY}) }} />
                    </div>
                    <div style={{width}}>
                        Z: [{this.state.minZ}, {this.state.maxZ}]  
                        <Range value={[this.state.minZ, this.state.maxZ]}min={0} max={dimension} pushable={1} onChange={([minZ, maxZ]) => { this.setState({minZ, maxZ}) }} />
                    </div>
                    <button onClick={() => {
                        this.setState({
                            minX: 0,
                            maxX: dimension,
                            minY: 0,
                            maxY: dimension,
                            minZ: 0,
                            maxZ: dimension,
                        })
                    }}>Reset</button>
                </div>
            </div>
        );
    }
}

export default Viewer