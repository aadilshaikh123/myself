import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Node {
  x: number;
  y: number;
  networkId: number;
  radius: number;
  baseRadius: number;
  color: string;
  pulse: number;
  connections: number[];
  vx: number;
  vy: number;
}

interface Network {
  nodes: Node[];
  id: number;
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  const networksRef = useRef<Network[]>([]);
  const animationIdRef = useRef<number>();
  const isDraggingRef = useRef(false);
  const dragNodeRef = useRef<Node | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Create a single node
    const createNode = (x: number, y: number, networkId: number): Node => ({
      x,
      y,
      networkId,
      radius: Math.random() * 3 + 2, // 2-6px
      baseRadius: Math.random() * 3 + 2,
      color: Math.random() > 0.5 ? '#00D9FF' : '#7C3AED',
      pulse: Math.random() * Math.PI * 2,
      connections: [],
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    });

    // Create a network of connected nodes
    const createNetwork = (centerX: number, centerY: number, nodeCount: number, networkId: number): Network => {
      const networkNodes: Node[] = [];
      const spread = 120;

      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const distance = Math.random() * spread;
        const x = centerX + Math.cos(angle) * distance + (Math.random() - 0.5) * 60;
        const y = centerY + Math.sin(angle) * distance + (Math.random() - 0.5) * 60;
        
        networkNodes.push(createNode(x, y, networkId));
      }

      // Create sparse connections
      networkNodes.forEach((node, i) => {
        const numConnections = Math.floor(Math.random() * 3) + 1;
        const distances = networkNodes.map((otherNode, j) => ({
          index: j,
          distance: Math.sqrt((node.x - otherNode.x) ** 2 + (node.y - otherNode.y) ** 2)
        })).filter(d => d.index !== i).sort((a, b) => a.distance - b.distance);

        for (let j = 0; j < Math.min(numConnections, distances.length); j++) {
          const targetIndex = distances[j].index;
          if (distances[j].distance < 150 && !node.connections.includes(targetIndex)) {
            node.connections.push(targetIndex);
          }
        }
      });

      return { nodes: networkNodes, id: networkId };
    };

    // Initialize networks
    const initNetworks = () => {
      networksRef.current = [];
      const networkCount = isMobile ? 6 : 8;
      
      for (let i = 0; i < networkCount; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const nodeCount = Math.floor(Math.random() * 8) + 5; // 5-12 nodes per network
        
        networksRef.current.push(createNetwork(x, y, nodeCount, i));
      }
    };

    // Update node positions and physics
    const updateNode = (node: Node) => {
      // Pulse animation
      node.pulse += 0.02;
      node.radius = node.baseRadius + Math.sin(node.pulse) * 0.5;

      // Automated movement
      if (!isDraggingRef.current || dragNodeRef.current !== node) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > window.innerWidth) node.vx *= -1;
        if (node.y < 0 || node.y > window.innerHeight) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(window.innerWidth, node.x));
        node.y = Math.max(0, Math.min(window.innerHeight, node.y));
      }
    };

    // Check collisions between networks
    const checkCollisions = () => {
      networksRef.current.forEach((network, i) => {
        networksRef.current.forEach((otherNetwork, j) => {
          if (i === j) return;
          
          network.nodes.forEach(node => {
            otherNetwork.nodes.forEach(otherNode => {
              const dist = Math.sqrt((node.x - otherNode.x) ** 2 + (node.y - otherNode.y) ** 2);
              if (dist < 100 && dist > 0) {
                // Simple collision response
                const angle = Math.atan2(otherNode.y - node.y, otherNode.x - node.x);
                const force = (100 - dist) * 0.01;
                
                node.vx -= Math.cos(angle) * force;
                node.vy -= Math.sin(angle) * force;
                otherNode.vx += Math.cos(angle) * force;
                otherNode.vy += Math.sin(angle) * force;
              }
            });
          });
        });
      });
    };

    // Draw a single node with glow effect
    const drawNode = (node: Node) => {
      ctx.save();
      
      // Glow effect
      ctx.shadowColor = node.color;
      ctx.shadowBlur = 10;
      
      // Node
      ctx.fillStyle = node.color;
      ctx.globalAlpha = 0.7 + Math.sin(node.pulse) * 0.3;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    // Draw connections between nodes
    const drawConnections = (network: Network) => {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 0.5;
      
      network.nodes.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
          const connectedNode = network.nodes[connectionIndex];
          if (connectedNode) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(connectedNode.x, connectedNode.y);
            ctx.stroke();
          }
        });
      });
      
      ctx.restore();
    };

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      networksRef.current.forEach(network => {
        network.nodes.forEach(updateNode);
        drawConnections(network);
        network.nodes.forEach(drawNode);
      });
      
      checkCollisions();
      
      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Mouse/touch utilities
    const getEventPos = (e: MouseEvent | TouchEvent): { x: number; y: number } => {
      const rect = canvas.getBoundingClientRect();
      if ('touches' in e) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      }
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const findNodeAt = (x: number, y: number): Node | null => {
      for (let network of networksRef.current) {
        for (let node of network.nodes) {
          const dist = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
          if (dist < node.radius + 10) {
            return node;
          }
        }
      }
      return null;
    };

    // Event handlers
    const handleStart = (e: MouseEvent | TouchEvent) => {
      const pos = getEventPos(e);
      mouseRef.current = pos;
      dragNodeRef.current = findNodeAt(pos.x, pos.y);
      if (dragNodeRef.current) {
        isDraggingRef.current = true;
        canvas.style.cursor = 'grabbing';
        if ('preventDefault' in e) e.preventDefault();
      }
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const pos = getEventPos(e);
      mouseRef.current = pos;
      
      if (isDraggingRef.current && dragNodeRef.current) {
        dragNodeRef.current.x = pos.x;
        dragNodeRef.current.y = pos.y;
        dragNodeRef.current.vx = 0;
        dragNodeRef.current.vy = 0;
        if ('preventDefault' in e) e.preventDefault();
      } else {
        const nodeUnderMouse = findNodeAt(pos.x, pos.y);
        canvas.style.cursor = nodeUnderMouse ? 'grab' : 'default';
      }
    };

    const handleEnd = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = false;
      dragNodeRef.current = null;
      canvas.style.cursor = 'default';
      if ('preventDefault' in e) e.preventDefault();
    };

    // Initialize everything
    resizeCanvas();
    initNetworks();
    animate();

    // Add event listeners
    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleEnd, { passive: false });
    window.addEventListener('resize', () => {
      resizeCanvas();
      initNetworks();
    });

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', handleEnd);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isMobile]);

  return (
    <div className="neural-network-canvas">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full"
        style={{ zIndex: 1, pointerEvents: 'auto' }}
      />
    </div>
  );
}
